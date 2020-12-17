import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { MenuItem, FormControl, Select, Card } from '@material-ui/core'
import InfoBox from './InfoBox'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

  let url = `https://disease.sh/v3/covid-19/countries`

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${url}`)
      // console.log(data)

      const modifiedData = data.map(({ countryInfo, country }) => {
        return {
          name: country,
          value: countryInfo.iso2
        }
      })
      // console.log(modifiedData)
      setCountries(modifiedData)
    }

    fetchData()
  }, [])

  const onCountryChange = async (e) => {
    setCountry(e.target.value)

    // const countryData = await axios.get(`${url}/${this.country}`)

    // console.log(countryData)
  }

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl>
          <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country, i) => (
              <MenuItem value={country.value} key={i}>
                {country.name}
              </MenuItem>
            ))}
            {/* {country} */}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
      <InfoBox title="Corona cases" total="2000" cases="123"/>
      <InfoBox title="Recovered" total="3000" cases="1242"/>
      <InfoBox title="Deaths" total="4000" cases="1252344"/>
              
      </div>
    </div>
  )
}

export default App
