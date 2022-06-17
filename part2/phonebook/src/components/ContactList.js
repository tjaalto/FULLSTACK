import React from 'react'
import Contact from "./Contact"

const ContactList = ({ persons, filter, onRemove }) => {
  const appliedFilter = filter.length ? filter : persons
  return (
    <div>
      {appliedFilter.map((person) => (
        <Contact key={person.id} person={person} onRemove={onRemove} />
      ))}
    </div>
  )
}

export default ContactList
