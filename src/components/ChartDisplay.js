
import {Chart} from 'react-google-charts'
import { useGlobalContext } from '../context'

const ChartDisplay = () => {
  const {allJobs} = useGlobalContext()

  const setChartData = () => {
    let data = [['From', 'To', 'Weight']]
    allJobs.map((job, i) => 
      job.statusHistory.map((status, i, array) => {
          let prev = i === 0 ? "Job Found" : array[i-1]
          data.push([prev, status, 1])
      })
    )
    console.log(data)
    return data
  }

  // setChartData()
  // const sankeyData = [
  //   ['From', 'To', 'Weight'],
  //   ['Job Found', 'Applied', 1],
  //   ['Job Found', 'Applied', 1],
  //   ['Job Found', 'Applied', 1],
  //   ['Job Found', 'Applied', 1],
  //   ['Job Found', 'Applied', 1],
  //   ['Job Found', 'Applied', 1],
  //   ['Applied', 'First Interview', 1],
  //   ['First Interview', 'Denied', 1]
  // ]

  return (
    <div>
      <Chart
          width={700}
          height={'350px'}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={setChartData()}
          rootProps={{ 'data-testid': '1' }}
        />

    </div>
  )
}

export default ChartDisplay