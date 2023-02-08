/**
 * BufferedList
 * React Component
 * 
 * A basic buffered list that can display a large amount of items with a small amount of HTML elements.
 * 
 * by rzkyif
 */

/* -------------------------------------------------------------------------- */
/*                                   imports                                  */
/* -------------------------------------------------------------------------- */

import { useMemo, useState } from "react"

/* -------------------------------------------------------------------------- */
/*                                  component                                 */
/* -------------------------------------------------------------------------- */

/**
 * BufferedList Component
 * 
 * A basic buffered list that can display a large amount of items with a small amount of HTML elements.
 * 
 * Prop:
 * - `data`: the data to be displayed
 * - `displayHeight`: the height of the scrollable list
 * - `rowHeight`: the height of each row
 * 
 * @param {{data, displayHeight, rowHeight}} props
 * @returns JSX.Element
 */
export default function BufferedList({
  data, displayHeight, rowHeight
}) {

  // constants
  const ROW_COUNT = data.length
  const REGION_ROW_COUNT = Math.ceil(displayHeight / rowHeight)
  const REGION_COUNT = Math.ceil(ROW_COUNT / REGION_ROW_COUNT)
  const REGION_HEIGHT = REGION_ROW_COUNT * rowHeight
  const TOTAL_HEIGHT = REGION_HEIGHT * REGION_COUNT

  // state
  const [currentRegion, setCurrentRegion] = useState(0)
  const currentRegionFirstRow = useMemo(
    () => currentRegion*REGION_ROW_COUNT, 
    [currentRegion]
  )
  
  return (
    <ul 
      className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden w-full"
      style={{height: displayHeight, display: 'flex', flexDirection: 'column', overflow: 'auto', width: '100%'}}
      onScroll={(e) => {
        const scrolledRegion = Math.round((e.target as HTMLElement).scrollTop/REGION_HEIGHT)
        if (currentRegion != scrolledRegion) {
          setCurrentRegion(scrolledRegion)
        }
      }}
    >
      {/* the padding for hidden rows */}
      <div 
        style={{
          paddingTop: Math.max(0, (currentRegion-1)*REGION_HEIGHT),
          paddingBottom: Math.max(0, TOTAL_HEIGHT - (currentRegion+2)*REGION_HEIGHT)
        }}
      >
        {
          // each visible row is rendered here
          data.slice(
            Math.max(0, currentRegionFirstRow-REGION_ROW_COUNT),
            currentRegionFirstRow+2*REGION_ROW_COUNT
          ).map((content, i) => (
            <li key={i} style={{height: rowHeight, margin: '0.5rem'}}>{content}</li>
          ))
        }
      </div>
    </ul>
  )
}