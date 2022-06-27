import axios from 'axios'
import { useState } from 'react'
import { connect } from 'react-redux'
import useSWR from 'swr'
import { addTask, pushTask } from '../store/features/task-list/slice'

function Index ({ tasks, addTask, pushTask }) {
  const [ text, setText ] = useState('')

  const { data, mutate } = useSWR('serverTasks', async () => {
    const resp = await axios.get('/api/data')

    return resp.data
  })

  const handlePush = async (task) => {
    await pushTask(task)

    mutate([ ...data, task ])
  }

  return (
    <div>
      <h1>Todos</h1>
      <form onSubmit={e => {
          e.preventDefault()
          setText('')

          addTask(text)
        }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <button>add</button>
      </form>
      <br />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '200px' }}>
          <h2>local state</h2>
          <div>
            {tasks?.map(x => (
              <div key={x.id}>
                <div style={{ display: 'flex' }}>
                  <div>{x.text}</div>
                  <button onClick={() => handlePush(x)}>push</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: '200px' }}>
          <h2>Server state</h2>
          <div>
            {data?.map(x => (
              <div key={x.text}>{x.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ tasks }) => ({ tasks })

const mapDispatchToProps = {
  addTask,
  pushTask
}

const connectedIndex = connect(mapStateToProps, mapDispatchToProps)(Index)

export default connectedIndex