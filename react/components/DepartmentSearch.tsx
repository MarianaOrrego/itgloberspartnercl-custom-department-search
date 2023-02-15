import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import QUERY_VALUE from '../graphql/getDepartmentGroup.graphql'
import DepartmentGroup from './DepartmentGroup';

import { SearchBar } from 'vtex.store-components'

const DepartmentSearch = () => {

    const { data, loading } = useQuery(QUERY_VALUE);
    const [slug, setSlug] = useState("");

    return (
        loading
            ?
            <div>loading...</div>
            :
            <div>
                <DepartmentGroup
                    departments={data?.categories}
                    handleSetSlug={setSlug}
                />
                <SearchBar
                    customSearchPageUrl={slug}
                    placeholder='¿Qué buscas en Mattelsa Clone?'
                    displayMode='search-and-clear-buttons'
                />
            </div>
    )
}

export default DepartmentSearch

