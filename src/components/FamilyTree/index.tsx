import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import { buildName, makeId, pick } from '../../generator'
import './FamilyTree.less'

type FamilyMember = {
  id: string
  name: string
  relationship: string
  details: string
  generation: number
  parentIds: string[]
}

type FamilyTreeProps = {
  name: string
  lineageLabel: string
  callingLabel: string | null
  themeLabel: string
  themeKey: string
  lineageKey: string
  callingKey: string | null
  complexity: number
}

const CARD_WIDTH = 200
const CARD_HEIGHT = 168
const NODE_STEP = 244
const EDGE_PADDING = 28

type DragState = {
  pointerId: number
  x: number
  y: number
  scrollLeft: number
  scrollTop: number
}

const DETAILS = {
  parent: [
    'Carries an old promise they have never explained.',
    'Has a talent for finding a way out of trouble.',
    'Keeps a quiet ambition hidden from the family.',
    'Is known for offering help to anyone in need.',
  ],
  sibling: [
    'Wants to prove they can make their own way.',
    'Still remembers a childhood promise you made.',
    'Has recently taken up an unexpected calling.',
    'May know more about the family past than they admit.',
  ],
  ancestor: [
    'Left behind a story the family tells differently each generation.',
    'Was known for taking risks that changed the family fortunes.',
    'Kept a keepsake whose purpose is now forgotten.',
    'Made an ally whose name still carries weight.',
  ],
}

function layoutMembers(members: FamilyMember[]) {
  const generationMembers = new Map<number, FamilyMember[]>()
  members.forEach((member) => {
    const row = generationMembers.get(member.generation) ?? []
    row.push(member)
    generationMembers.set(member.generation, row)
  })

  const positions = new Map<string, number>()
  const generations = [...generationMembers.keys()]
  const minimumGeneration = Math.min(...generations)
  const maximumGeneration = Math.max(...generations)
  const familyGroups = new Map<string, { parentIds: string[]; children: FamilyMember[] }>()
  members.forEach((child) => {
    if (child.parentIds.length === 0) return
    const key = child.parentIds.slice().sort().join('|')
    const group = familyGroups.get(key) ?? {
      parentIds: child.parentIds,
      children: [],
    }
    group.children.push(child)
    familyGroups.set(key, group)
  })

  const groupsByChildGeneration = new Map<number, number>()
  familyGroups.forEach((group) => {
    const generation = group.children[0].generation
    groupsByChildGeneration.set(generation, (groupsByChildGeneration.get(generation) ?? 0) + 1)
  })

  const rowY = new Map<number, number>([[minimumGeneration, EDGE_PADDING]])
  for (let generation = minimumGeneration; generation < maximumGeneration; generation++) {
    const familyCount = groupsByChildGeneration.get(generation + 1) ?? 0
    const gap = 32 + (familyCount + 1) * 12
    rowY.set(generation + 1, rowY.get(generation)! + CARD_HEIGHT + gap)
  }

  const bottomRow = generationMembers.get(maximumGeneration) ?? []
  const character = bottomRow.find((member) => member.relationship === 'You')
  const siblings = bottomRow.filter((member) => member !== character)
  const leftSiblings = siblings.filter((_, index) => index % 2 === 1).reverse()
  const rightSiblings = siblings.filter((_, index) => index % 2 === 0)
  const orderedBottomRow = character ? [...leftSiblings, character, ...rightSiblings] : bottomRow

  orderedBottomRow.forEach((member, index) => {
    positions.set(member.id, (index - (orderedBottomRow.length - 1) / 2) * NODE_STEP)
  })

  for (let generation = maximumGeneration; generation > minimumGeneration; generation--) {
    const children = generationMembers.get(generation) ?? []
    const siblingGroups = new Map<string, FamilyMember[]>()
    children.forEach((member) => {
      const key = member.parentIds.length
        ? member.parentIds.slice().sort().join('|')
        : `member:${member.id}`
      const group = siblingGroups.get(key) ?? []
      group.push(member)
      siblingGroups.set(key, group)
    })

    const occupied = children
      .map((member) => positions.get(member.id))
      .filter((position) => position !== undefined)
    siblingGroups.forEach((group) => {
      const anchors = group
        .map((member) => positions.get(member.id))
        .filter((position) => position !== undefined)
      const center = anchors.length
        ? anchors.reduce((sum, position) => sum + position, 0) / anchors.length
        : occupied.length
          ? Math.max(...occupied) + NODE_STEP
          : 0
      let slot = 1

      group.forEach((member) => {
        if (positions.has(member.id)) return

        let candidate = center
        while (occupied.some((position) => Math.abs(position - candidate) < NODE_STEP)) {
          const distance = Math.ceil(slot / 2) * NODE_STEP
          candidate = center + (slot % 2 === 1 ? -distance : distance)
          slot += 1
        }
        positions.set(member.id, candidate)
        occupied.push(candidate)
      })
    })

    const parentGroups = new Map<string, { parentIds: string[]; childPositions: number[] }>()

    children.forEach((child) => {
      if (child.parentIds.length === 0) return
      const key = child.parentIds.slice().sort().join('|')
      const group = parentGroups.get(key) ?? {
        parentIds: child.parentIds,
        childPositions: [],
      }
      const childPosition = positions.get(child.id)
      if (childPosition !== undefined) group.childPositions.push(childPosition)
      parentGroups.set(key, group)
    })

    const orderedGroups = [...parentGroups.values()]
      .map((group) => ({
        ...group,
        center:
          group.childPositions.reduce((sum, position) => sum + position, 0) /
          Math.max(1, group.childPositions.length),
      }))
      .sort((a, b) => a.center - b.center)

    let previousPosition = Number.NEGATIVE_INFINITY
    const parentBlocks = orderedGroups.map((group) => {
      const blockWidth = Math.max(0, group.parentIds.length - 1) * NODE_STEP
      const left = Math.max(group.center - blockWidth / 2, previousPosition + NODE_STEP)
      const center = left + blockWidth / 2
      previousPosition = center + blockWidth / 2
      return { ...group, blockWidth, center, targetCenter: group.center, left }
    })
    const targetMean =
      parentBlocks.reduce((sum, block) => sum + block.targetCenter, 0) /
      Math.max(1, parentBlocks.length)
    const arrangedMean =
      parentBlocks.reduce((sum, block) => sum + block.center, 0) / Math.max(1, parentBlocks.length)
    const correction = targetMean - arrangedMean

    parentBlocks.forEach((block) => {
      block.parentIds.forEach((parentId, index) => {
        positions.set(parentId, block.left + index * NODE_STEP + correction)
      })
    })
  }

  const allPositions = [...positions.values()]
  const minX = Math.min(...allPositions)
  const maxX = Math.max(...allPositions)
  const width = maxX - minX + CARD_WIDTH + EDGE_PADDING * 2
  const offsetX = EDGE_PADDING + CARD_WIDTH / 2 - minX
  const height = rowY.get(maximumGeneration)! + CARD_HEIGHT + EDGE_PADDING
  const placed = members.map((member) => ({
    ...member,
    x: (positions.get(member.id) ?? 0) + offsetX,
    y: rowY.get(member.generation) ?? EDGE_PADDING,
  }))
  const placedById = new Map(placed.map((member) => [member.id, member]))
  const positionedGroups = [...familyGroups.entries()]
    .map(([key, group]) => ({
      key,
      parents: group.parentIds
        .map((parentId) => placedById.get(parentId))
        .filter((parent) => parent !== undefined)
        .sort((a, b) => a.x - b.x),
      children: group.children
        .map((child) => placedById.get(child.id))
        .filter((child) => child !== undefined)
        .sort((a, b) => a.x - b.x),
    }))
    .filter((group) => group.parents.length > 0 && group.children.length > 0)
    .sort((a, b) => {
      const generationDifference = a.children[0].generation - b.children[0].generation
      if (generationDifference !== 0) return generationDifference
      const aCenter = (a.parents[0].x + a.parents[a.parents.length - 1].x) / 2
      const bCenter = (b.parents[0].x + b.parents[b.parents.length - 1].x) / 2
      return aCenter - bCenter
    })

  const laneIndices = new Map<string, number>()
  const lanesInGeneration = new Map<number, number>()
  positionedGroups.forEach((group) => {
    const generation = group.children[0].generation
    const lane = lanesInGeneration.get(generation) ?? 0
    laneIndices.set(group.key, lane)
    lanesInGeneration.set(generation, lane + 1)
  })

  const edges = positionedGroups.flatMap((group) => {
    const { parents, children } = group
    const parentY = Math.max(...parents.map((parent) => parent.y + CARD_HEIGHT))
    const childY = Math.min(...children.map((child) => child.y))
    const joinY = parentY + 14
    const childBarY = childY - 14
    const parentCenter = (parents[0].x + parents[parents.length - 1].x) / 2
    const childCenter = (children[0].x + children[children.length - 1].x) / 2
    const lane = laneIndices.get(group.key) ?? 0
    const laneCount = lanesInGeneration.get(children[0].generation) ?? 1
    const routeY = joinY + ((childBarY - joinY) * (lane + 1)) / (laneCount + 1)
    const path = [
      `M ${parents[0].x} ${parents[0].y + CARD_HEIGHT} V ${joinY}`,
      ...parents.slice(1).map((parent) => `M ${parent.x} ${parent.y + CARD_HEIGHT} V ${joinY}`),
      `M ${parents[0].x} ${joinY} H ${parents[parents.length - 1].x}`,
      `M ${parentCenter} ${joinY} V ${routeY} H ${childCenter} V ${childBarY}`,
      `M ${children[0].x} ${childBarY} H ${children[children.length - 1].x}`,
      ...children.map((child) => `M ${child.x} ${childBarY} V ${child.y}`),
    ].join(' ')
    return [path]
  })

  return { placed, edges, width, height }
}

export default function FamilyTree({
  name,
  lineageLabel,
  callingLabel,
  themeLabel,
  themeKey,
  lineageKey,
  callingKey,
  complexity,
}: FamilyTreeProps) {
  const [panelOpen, setPanelOpen] = useState(true)
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [isPanning, setIsPanning] = useState(false)
  const treeViewportRef = useRef<HTMLDivElement | null>(null)
  const centerTreeOnNextRender = useRef(false)
  const dragRef = useRef<DragState | null>(null)

  const rootName = name.split(', the ')[0].trim()
  const familyName = rootName.split(/\s+/).slice(1).join(' ')
  const who = callingLabel ? `${lineageLabel} ${callingLabel}` : lineageLabel

  function createRelative(
    relationship: string,
    generation: number,
    parentIds: string[] = [],
  ): FamilyMember {
    const generatedName = buildName(
      themeKey,
      lineageKey,
      callingKey,
      { first: true, middle: false, surname: false, title: false },
      complexity,
    ).full
    const surname = familyName || ''
    const fullName = [generatedName, surname].filter(Boolean).join(' ')
    const detailBank =
      relationship === 'Sibling' || relationship.includes('Aunt / Uncle')
        ? DETAILS.sibling
        : generation < -1
          ? DETAILS.ancestor
          : DETAILS.parent

    return {
      id: makeId(),
      name: fullName,
      relationship,
      details: pick(detailBank),
      generation,
      parentIds,
    }
  }

  function generate() {
    const parentOne = createRelative('Parent', -1)
    const parentTwo = createRelative('Parent', -1)
    const root: FamilyMember = {
      id: makeId(),
      name,
      relationship: 'You',
      details: `${who} · ${themeLabel} setting`,
      generation: 0,
      parentIds: [parentOne.id, parentTwo.id],
    }
    centerTreeOnNextRender.current = true
    setMembers([parentOne, parentTwo, root])
    setSelectedMemberId(root.id)
  }

  useLayoutEffect(() => {
    if (!centerTreeOnNextRender.current) return

    const viewport = treeViewportRef.current
    if (!viewport) return

    viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2)
    viewport.scrollTop = Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2)
    centerTreeOnNextRender.current = false
  }, [members])

  function addSibling() {
    const selectedMember = members.find((member) => member.id === selectedMemberId)
    if (!selectedMember) return

    let parentIds = selectedMember.parentIds
    const newParents: FamilyMember[] = []
    if (parentIds.length === 0) {
      const parentRelationship =
        selectedMember.generation === 0
          ? 'Parent'
          : `${'Great-'.repeat(Math.max(0, -selectedMember.generation - 1))}Grandparent`
      const parentOne = createRelative(parentRelationship, selectedMember.generation - 1)
      const parentTwo = createRelative(parentRelationship, selectedMember.generation - 1)
      newParents.push(parentOne, parentTwo)
      parentIds = [parentOne.id, parentTwo.id]
    }

    const siblingRelationship =
      selectedMember.generation === 0
        ? 'Sibling'
        : `${'Great-'.repeat(Math.max(0, -selectedMember.generation - 1))}Aunt / Uncle`
    const sibling = createRelative(siblingRelationship, selectedMember.generation, parentIds)
    setMembers((existing) => [
      ...existing.map((member) =>
        member.id === selectedMember.id && member.parentIds.length === 0
          ? { ...member, parentIds }
          : member,
      ),
      ...newParents,
      sibling,
    ])
  }

  function addParents(member: FamilyMember) {
    if (member.parentIds.length > 0) return
    const relationship =
      member.generation === -1
        ? 'Grandparent'
        : `${'Great-'.repeat(Math.max(0, -member.generation - 1))}Grandparent`
    const parentOne = createRelative(relationship, member.generation - 1)
    const parentTwo = createRelative(relationship, member.generation - 1)
    setMembers((existing) => [
      ...existing.map((item) =>
        item.id === member.id ? { ...item, parentIds: [parentOne.id, parentTwo.id] } : item,
      ),
      parentOne,
      parentTwo,
    ])
  }

  function startPan(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    if (event.target instanceof Element && event.target.closest('button')) return

    const viewport = event.currentTarget
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    }
    viewport.setPointerCapture(event.pointerId)
    setIsPanning(true)
    event.preventDefault()
  }

  function pan(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.x)
    event.currentTarget.scrollTop = drag.scrollTop - (event.clientY - drag.y)
  }

  function stopPan(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return
    dragRef.current = null
    setIsPanning(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const tree = members.length ? layoutMembers(members) : null

  return (
    <section className="family-tree-panel">
      <div className="family-tree-heading">
        <h2>Family Tree</h2>
        <button
          type="button"
          className="family-tree-toggle"
          aria-expanded={panelOpen}
          aria-controls="family-tree-content"
          onClick={() => setPanelOpen((open) => !open)}
        >
          {panelOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      <div id="family-tree-content" className="family-tree-content" hidden={!panelOpen}>
        {!tree && (
          <>
            <p className="family-tree-hint">
              Start with your character and two parents, then expand the tree as you like.
            </p>
            <button type="button" className="family-tree-button" onClick={generate}>
              Generate family tree
            </button>
          </>
        )}

        {tree && (
          <>
            <div
              ref={treeViewportRef}
              className={`family-tree-scroll${isPanning ? ' is-panning' : ''}`}
              role="region"
              aria-label={`${name}'s family tree`}
              tabIndex={0}
              onPointerDown={startPan}
              onPointerMove={pan}
              onPointerUp={stopPan}
              onPointerCancel={stopPan}
              onLostPointerCapture={() => {
                dragRef.current = null
                setIsPanning(false)
              }}
            >
              <div
                className="family-tree-canvas"
                style={{ width: tree.width, height: tree.height }}
              >
                <svg
                  className="family-tree-edges"
                  width={tree.width}
                  height={tree.height}
                  aria-hidden="true"
                >
                  {tree.edges.map((path, index) => (
                    <path key={index} d={path} />
                  ))}
                </svg>
                {tree.placed.map((member) => (
                  <article
                    key={member.id}
                    className={[
                      'family-member',
                      member.relationship === 'You' && 'family-member-self',
                      member.id === selectedMemberId && 'family-member-selected',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{
                      left: member.x - CARD_WIDTH / 2,
                      top: member.y,
                      width: CARD_WIDTH,
                      height: CARD_HEIGHT,
                    }}
                    onClick={() => setSelectedMemberId(member.id)}
                  >
                    <span className="family-member-relationship">{member.relationship}</span>
                    <button
                      type="button"
                      className="family-member-select"
                      aria-label={`Select ${member.name}`}
                      aria-pressed={member.id === selectedMemberId}
                    >
                      {member.name}
                    </button>
                    <p>{member.details}</p>
                    {member.relationship !== 'You' && member.parentIds.length === 0 && (
                      <button
                        type="button"
                        className="family-member-expand"
                        onClick={() => addParents(member)}
                      >
                        Add parents
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </div>
            <div className="family-tree-actions">
              <div className="family-tree-action-buttons">
                <button type="button" className="family-tree-button" onClick={addSibling}>
                  Add sibling
                </button>
                <button type="button" className="family-tree-button" onClick={generate}>
                  Reset tree
                </button>
              </div>
              <p className="family-tree-hint">
                Drag the tree to pan, or use the scroll bars and wheel to explore. Add a sibling to
                the selected person, or use Add parents on any relative to expand the tree.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
