import React, { useState } from "react"
import styled from "styled-components"

const MiniText = styled.pre`
  font-size: ${p => p.zoom * 10}px;
  color: green;
`
const YellowBox = styled.div`
  background: #fdfde2;
  border-radius: 5px;
  border: 1px solid #dada00;
`
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`
function ShowMe({ obj, name }) {
  const [zoom, setZoom] = useState(1)
  return (
    <YellowBox>
      <TopRow>
        <p>{name}</p>
        <div>
          <button onClick={() => setZoom(old => old - 0.5)}>-</button>
          <button onClick={() => setZoom(old => old + 0.5)}>+</button>
        </div>
      </TopRow>
      <MiniText zoom={zoom}>{JSON.stringify(obj, 0, 2)}</MiniText>
    </YellowBox>
  )
}

export default ShowMe
