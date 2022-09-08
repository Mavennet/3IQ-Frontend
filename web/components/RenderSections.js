import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import * as SectionComponents from './sections'
import capitalizeString from '../utils/capitalizeString'

function resolveSections(section) {
  // eslint-disable-next-line import/namespace
  const Section = SectionComponents[capitalizeString(section._type)]

  if (Section) {
    return Section
  }

  console.error('Cant find section', section) // eslint-disable-line no-console
  return null
}

function RenderSections(props) {
  const {sections, routes, posts, teams} = props

  sections.forEach((section) => {
    const toConvertItems = [
      'localeCta', 
      'localeText', 
      'localeString', 
      'localeSimplePortableText',
      'localePortableText'
    ]
    const sectionKeys = Object.keys(section)
    const sectionValues = Object.values(section)
    const filteredSectionKeys = []
    sectionValues.forEach((value, index) => {
      if (value && value._type && toConvertItems.indexOf(value._type) >= 0) {
        filteredSectionKeys.push(sectionKeys[index])
      }
    })
    filteredSectionKeys.forEach((key) => {
      if (section[key] && section.currentLanguage) {
        const localeButton = section[key][section.currentLanguage.languageTag]
        if (localeButton && localeButton.route) {
          const formatedRoute = routes.filter((r) => r._id === localeButton.route._ref)[0]
          localeButton.route = formatedRoute
        }
        section[key] = localeButton
      }
    })    

    if (section.post && section.post._ref) {
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i]

        if (post._id === section.post._ref) {
          section.post = post
          break
        }              
      }

      if (section.route) {
        for (let i = 0; i < routes.length; i++) {
          const route = routes[i]
          
          if (route._id === section.route._ref) {
            section.route = route
          }
        }
      }
    }  

    if (section.teams) {
      for (let index = 0; index < section.teams.length; index++) {
        for (let i = 0; i < teams.length; i++) {
          const team = teams[i]
  
          if (team._id === section.teams[index]._ref) {
            section.teams[index] = team
          }              
        }          
      }
    }
  })

  if (!sections) {
    console.error('Missing section')
    return <div>Missing sections</div>
  }

  return (
    <Fragment>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section)
        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>
        }
        return <SectionComponent {...section} key={section._id} />
      })}
    </Fragment>
  )
}

RenderSections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    })
  ),
  routes: PropTypes.array,
  posts: PropTypes.array,
  teams: PropTypes.array,
}

export default RenderSections
