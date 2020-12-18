import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core'
import InfoBox from './InfoBox'
import Map from './Map'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})

  // const url = `https://disease.sh/v3/covid-19/countries`
  // const dailyData = 'https://disease.sh/v3/covid-19/countries'

  // Set worldwide data in state
  useEffect(() => {
    const fetchWorldwide = async () => {
      const { data } = await axios.get(`https://disease.sh/v3/covid-19/all`)

      // console.log(data)
      setCountryInfo(data)
    }

    fetchWorldwide()
  }, [])

  // Set all countries name in state
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://disease.sh/v3/covid-19/countries`
      const { data } = await axios.get(`${url}`)
      // console.log(data)

      const modifiedData = data.map(({ countryInfo, country }) => {
        return {
          name: country,
          value: countryInfo.iso2,
        }
      })
      // console.log(modifiedData)
      setCountries(modifiedData)
    }

    fetchData()
  }, [])

  // Fetch daily data and yesterdays deaths for specific country
  const dailyData = async (countryCode) => {
    const countryDailyData = `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=true&strict=true`
    const { data } = await axios.get(countryDailyData)
    // console.log(data)
    return data
  }

  const onCountryChange = async (e) => {
    const countryCode = e.target.value

    // Fetch daily data for specific country except for Worldwide data
    if (countryCode !== 'worldwide') {
      const url = `https://disease.sh/v3/covid-19/countries/${countryCode}`
      const { data } = await axios.get(`${url}`)
      const { todayCases, todayRecovered, todayDeaths } = await dailyData(
        countryCode
      )

      const modifiedData = {
        ...data,
        todayDeaths: todayDeaths,
        todayRecovered: todayRecovered,
        todayCases: todayCases,
      }

      // console.log(modifiedData)

      setCountry(countryCode)
      setCountryInfo(modifiedData)
    } else {
      const url = 'https://disease.sh/v3/covid-19/all'

      const { data } = await axios.get(`${url}`)

      console.log(data)

      setCountry(countryCode)
      setCountryInfo(data)
    }
  }

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country, i) => (
                <MenuItem value={country.value} key={i}>
                  {country.name}
                </MenuItem>
              ))}
              {/* {country} */}
            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox
            title='Corona cases'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title={country === 'worldwide' ? 'Today Deaths' : 'Yesterdays Deaths'}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
