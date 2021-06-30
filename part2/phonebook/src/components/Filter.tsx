import React from 'react'

interface IFilterProps {
    filter: string
    handleFilter(event: React.ChangeEvent<HTMLInputElement>): void
}

const Filter = ({ filter, handleFilter }: IFilterProps) => (
    <div>
        <p>filter shown with: <input value={filter} onChange={handleFilter} /></p>
    </div>
)

export default Filter