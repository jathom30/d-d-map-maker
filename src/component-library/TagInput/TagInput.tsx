import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../Button'
import './TagInput.scss'
import { TextInput } from '../TextInput'

type TagInputType = {
  id?: string
  onChange: (tags: string[]) => void
}

export const TagInput: React.FC<TagInputType> = ({ id, onChange }) => {
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')

  const addTags = (value: string) => {
    setTags(Array.from(new Set([...tags, value])))
  }

  const removeTags = (value: string) => {
    setTags(tags.filter((tag) => tag !== value))
  }

  useEffect(() => {
    onChange(tags)
  }, [tags])

  return (
    <div className="TagInput">
      <ul className="TagInput__tags">
        {tags.map((tag) => (
          <li key={tag} className="TagInput__tags--tag">
            <Button
              size="s"
              onClick={() => removeTags(tag)}
              iconRight={<FontAwesomeIcon icon={faTimes} />}
            >
              {tag}
            </Button>
          </li>
        ))}
        <li className="TagInput__input">
          <TextInput
            id={id}
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTags(currentTag)
                if (!tags.includes(currentTag)) setCurrentTag('')
              }
            }}
          />
        </li>
      </ul>
    </div>
  )
}
