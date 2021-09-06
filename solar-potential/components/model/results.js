import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme , VictoryAxis } from 'victory';

const Results = ({ data }) => {
  const { summer, winter } = data
  const xticks = [...Array(24).keys()]
  const xlabels = xticks.map(i => `${i}:00hrs`)
  return (
    <div style={{width: '30rem', height: '25rem'}}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={'600'}
        >
        <VictoryAxis
          tickValues={ xticks }
          />
        <VictoryAxis
          dependentAxis
          tickValues={ [...Array(12).keys()].map(x=>x*100) }
          />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={ summer }
        />
      <VictoryLine
        name='winter'
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={ winter }
      />
    </VictoryChart>
    </div>
  )
}

export default Results;
