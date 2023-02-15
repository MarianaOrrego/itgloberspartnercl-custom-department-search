import React from 'react'

type Props = {
    departments: [Category],
    handleSetSlug: any
}

type Category = {
    id: number,
    name: string,
    slug: string
}

const DepartmentGroup = ({ departments, handleSetSlug }: Props) => {

    const onHandleSetSlug = (event: any) => {
        handleSetSlug(`${event.target.value}/$\{term\}?_q=$\{term\}&map=ft`)
    }

    const departmentOptions: any = departments.map((department: Category) => {
        return (
            <option
                value={department.slug}
                key={department.id}
            >
                {department.name}
            </option>
        )
    })

    return (
        <div className='mh7'>
            <select
                className='mh7 w-10-l w-20-m w-20-ns w-80 pa2 br2 ba'
                style={{ fontFamily: 'Montserrat', background: 'transparent', borderColor: 'transparent' }}
                defaultValue="value0"
                onChange={onHandleSetSlug}
            >
                <option disabled value="value0">Filtrar</option>
                {departmentOptions}
            </select>
        </div>
    )
}

export default DepartmentGroup
