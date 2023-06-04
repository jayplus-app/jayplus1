import { ReactNode } from 'react'
import './TypeDescription.css'

interface TypeDescriptionProps {
	description: ReactNode
}

const TypeDescription = ({ description }: TypeDescriptionProps) => {
	return <div className="mt-2 type-description">{description}</div>
}

export default TypeDescription
