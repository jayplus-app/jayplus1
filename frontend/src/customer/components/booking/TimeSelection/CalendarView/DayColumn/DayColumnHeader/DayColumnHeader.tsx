import './DayColumnHeader.css'

interface DayColumnHeaderProps {
	date: string
}

const DayColumnHeader = ({ date }: DayColumnHeaderProps) => {
	return (
		<div id="date-header" className="mb-4 flex justify-center items-center">
			{date}
		</div>
	)
}

export default DayColumnHeader
