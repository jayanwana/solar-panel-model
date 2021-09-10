import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme , VictoryAxis } from 'victory';

const Results = ({ data, clear }) => {
  const { summer, winter } = data
  const xticks = [...Array(24).keys()]
  const xlabels = xticks.map(i => `${i}:00hrs`)
  const maxTick = (Math.ceil(summer[12]['y'] / 100)) + 2
  console.log(maxTick);
  return (
    <>
    <style jsx>
      {`
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        button {
          margin: 10;
        }
        .buttonContainer {
          display: flex;
          justify-content: center;
          padding : 10;
        }
      `}
    </style>
    <div style={{width: '30rem', height: '25rem'}}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={600}
        >
        <VictoryAxis
          tickValues={ xticks }
            label={ 'Time in hrs' }
            style={{
              axisLabel: {fontSize: 15, padding: 35},
              tickLabels: {fontSize: 10, padding: 5}
            }}
          />
        <VictoryAxis
          dependentAxis
          tickValues={ [...Array(maxTick).keys()].map(x=>x*100) }
          label={ 'Power Generated (W)' }
          fixLabelOverlap={true}
          style={{
            axisLabel: {fontSize: 15, padding: 35},
            tickLabels: {fontSize: 10, padding: 5}
          }}
          />
        <VictoryLine
          labels={({ datum }) => datum.x === 12 ? 'summer' : ''}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={ summer }
        />
      <VictoryLine
        name='winter'
        labels={({ datum }) => datum.x === 12 ? 'winter' : ''}
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={ winter }
      />
    </VictoryChart>
    </div>
    <div style={{marginTop: '40px'}}>
      <h4>Energy production tables</h4>
      <table>
        <tr>
          <th>Time (hrs)</th>
          <th>Summer (W)</th>
          <th>Winter (W)</th>
        </tr>
        {Object.keys(summer).map(i => (
          <tr key={i}>
            <td>{i}</td>
            <td>{summer[i]['y']}</td>
            <td>{winter[i]['y']}</td>
          </tr>
        ))}
      </table>
    </div>
    <div className={'buttonContainer'}>
      <button onClick={() => clear(null)}>Return</button>
    </div>
    </>
  )
}

export default Results;
