import React from 'react'
import classNames from 'classnames'
import './SectionList.css'

const SectionList = ({activeSectionId, filteredSections, updateActive}) => {
  const sections = filteredSections.map((item, index) => {
    return (<div className='sectionDiv'
                 key={`sectionNavigation-${index}`}>
      <a
        className={classNames({
          'active': item.id === activeSectionId})
        }>
        <span className='textLabel' onClick={() => updateActive(item.id)}>{item.displayName}</span>
      </a>
      <span>&nbsp;&nbsp;</span>
    </div>)
  })
  return (
    <div className='Sections-navigation'>
      {sections}
    </div>
  )
}

export default SectionList
