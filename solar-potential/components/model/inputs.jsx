import React, { useState } from 'react';
import { useCurrentUser } from '@/hooks/index';

const types = [
  { id: 0, name: 'Cost: £100/m2, Efficiency: 0.2', value: { panelCost: 100, panelEfficiency: 0.2 } },
  { id: 1, name: 'Cost: £85/m2, Efficiency: 0.15', value: { panelCost: 100, panelEfficiency: 0.15 } },
]

export default function modelInputForm({ setData }) {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center' }}>
        Please sign in to post
      </div>
    );
  }

  async function hanldeSubmit(e) {
    e.preventDefault();
    const body = {
      roofAngle: e.currentTarget.roofAngle.value,
      roofArea: e.currentTarget.roofArea.value,
      clientBudget: e.currentTarget.clientBudget.value,
      panelEfficiency: JSON.parse(e.target.panelType.value).panelEfficiency,
      panelCost: JSON.parse(e.target.panelType.value).panelCost,
    };
    // if (!e.currentTarget.content.value) return;
    // e.currentTarget.content.value = '';
    const res = await fetch('/api/model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = await res.json()
      setData(data);
      // setMsg('Modeling!');
      // setTimeout(() => setMsg(null), 5000);
    } else {
      setMsg(await res.text())
    }
  }

  return (
    <>
      <style jsx>
        {`
          label {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 0.5rem;
            align-items: center;
            width: 40rem;
            text-align: right;
          }
          form {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }
          input,
          textarea,
          select {
            font-family: monospace;s
            // flex: 1 1 0%;
            margin-left: 0.5rem;
            width: 20rem;
            color: #000;
            background-color: transparent;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            border: 1px solid #000000;
            border-radius: 5px;
            outline: 0px;
            margin: 0px 25px;
            padding: 10px 15px;
          }
        `}
      </style>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>
        {msg}
      </p>

      <form onSubmit={hanldeSubmit} autoComplete="off">
        <label htmlFor="roofArea">
          Area of Roof in meters squared
          <input
            name="roofArea"
            type="number"
          />
        </label>
        <label htmlFor="roofAngle">
          Angle of Roof in degrees
          <input
            name="roofAngle"
            type="number"
          />
        </label>
        <label htmlFor="panelType">
          Panel Type
          <select id="panelType" name="panelType">
            {types.map((panel) => (
              <option key={panel.id} value={JSON.stringify(panel.value)}>{panel.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="clientBudget">
          Client Budget in £
          <input
            name="clientBudget"
            type="number"
          />
        </label>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Submit</button>
      </form>
    </>
  );
}
