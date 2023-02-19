# DEPARTMENT SEARCH


<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

Se dará la opción de filtrar la busqueda en la tienda eligiendo un departamento

![image](https://user-images.githubusercontent.com/83648336/219951292-643eb9e5-7c88-4f0c-805b-bc6763c0369e.png)

## Configuración

1. Usar el template [vtex-app](https://github.com/vtex-apps/react-app-template)
2. Modificar el `manifest.json`
     ```json 
        {
          "vendor": "itgloberspartnercl",
          "name": "custom-department-search",
          "version": "0.0.1",
          "title": "Search bar customizado",
          "description": "Daremos la opción de eleegir un departamento en nuestra barra de búsqueda",
        }
     ``` 
      **vendor:** nombre del cliente o información suministrada por él

      **name:** nombre del componente

      **version:** versión del componente

      **title:** titulo asigando al componente

      **description:** breve descripción del componente


   Agregar en la sección `builders` dentro del `manifest.json` un `store`

    ```json   
        "store" : "0.x"
    ```
   En `dependencies` se van a agregar las siguientes dependencias necesarias para el funcionamiento del **componente**

    ```json   
        "dependencies": {
          "vtex.css-handles": "0.x",
          "vtex.store-graphql": "2.x",
          "vtex.store-components": "3.x"
        }
    ```  
3. En el template se tienen dos `package.json` en ambos se debe modificar la `version` y el `name` 
   ```json 
        "version": "0.0.1",
        "name": "custom-department-search",
   ```  
4. Agregar a la carpeta raíz una carpeta llamada `store`, dentro crear un file llamado `interfaces.json`, en este file se tendrá la siguiente configuración:
    ```json 
        {
          "department-search": {
              "component": "DepartmentSearch",
              "composition": "children",
              "render": "client"
          }
        }
    ```
      Se especifica el nombre del componente con el cual será llamado en el `store-theme` de la tienda que se esta realizando, dentro se encuentra el `component` (se debe poner el nombre del componente React a realizar), su `composition` que en este caso será *children* y por ultimo el `render` donde se especifica que su renderización será solo en la parte del *cliente* 

5. Finalizado los puntos anteriores, se procede a ingresar a la carpeta `react` en la cual se realizan las siguientes configuraciones: 
    
    5.1. Ejecutar el comando `yarn install` para preparar las dependencias
    
    5.2. Crear el functional component `DepartmentSearch.tsx` con la siguiente configuración 
    
    ```typescript
          import DepartmentSearch from './components/DepartmentSearch';

          export default DepartmentSearch
    ```   
    5.3. Crear una carpeta llamada `components`, dentro se tiene el functional component `DepartmentSearch` con la configuración necesaria para el funcionamiento del componente, se tienen las importaciones empleadas y el desarrollo del componente en cuanto al **SearchBar de busqueda**
    ```typescript
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
    ```
    
    Se tendrá un segundo functional component llamado `DepartmentGroup` el cual será el filtro por depantamentos
    
    ```typescript
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
    ```
    
    5.4. En la carpeta `react` se crea una carpeta `graphql` la cual contendra el archivo que traera los departamentos asociados desde el BackOffice
    
    ```graphql
       query{
        categories(treeLevel: 1){
          id,
          name,
          slug,
          children{
            id,
            name,
            slug
          }
        }
      }
    ```
       
    **NOTA:** para realizar la **query** lo ideal es apoyarse de GraphQL IDE en la sección de **admin** de VTEX IO para la tienda que se esta desarrollando

6. Linkear el componente custom al `store-theme` de la tienda base

    6.1. Iniciar sesión 
    ```console
       vtex login <vendor>
    ```

    6.2. Elegir el `workspace` en el cual se esta trabajando
    ```console
       vtex use <nombre_worksapce>
    ```

    6.3. Linkear el componente
    ```console
       vtex link
    ```

    6.4. Verificar que el componente quede linkeado, para eso se emplea el siguiente comando

     ```console
        vtex ls
     ```

    En consola debe verse las aplicaciones linkeadas al proyecto, verificando de esta forma que el componente quedo listo para emplearse:

    ```console
        Linked Apps in <vendor> at workspace <nombre_store_theme>
        itgloberspartnercl.custom-department-search     0.0.1
     ```
      
7. Hacer el llamado del componente desde el `store theme`

## Propiedades

### `Props` 

| Nombre Prop    | Tipo           | Descripción                                                | Valor por defecto  |
| ------------   | ---------------| ---------------------------------------------------------- | ------------------ |
| `handleSetSlug`| `string`       | Se empleará para la configuración del termino de busqueda  | `any`              |
| `departments`  | `object`       | Contendrá la Prop `Category`                               | `[Category]`       |

- `Category` object:

| Nombre Prop  | Tipo           | Descripción                   |
| ------------ | -------------- | ----------------------------- | 
| `id`         | `number`       | id del producto               | 
| `name`       | `string`       | nombre del producto           | 
| `slug`       | `string`       | identificador del procuto     | 

Tipos de Prop empleadas: 

- `string` 
- `number`
- `object`

## Colaboradores ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Mariana Orrego Franco

<!-- DOCS-IGNORE:end -->


