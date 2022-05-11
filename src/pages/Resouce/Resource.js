import React, { useState, useEffect } from 'react'
import { mostrarExitoEditar } from '../../components/Alert/Alert'
import NavComponent from "../../components/NavComponent/NavComponent";
import DataTable from 'react-data-table-component';

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <input
            id="search"
            name="search"
            type="text"
            value={filterText}
            onChange={onFilter}
            aria-label="Search Input"
            className="appearance-none rounded-none relative mx-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="Buscar por Nombre"
        />
        <button
            onClick={onClear}
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                          focus:ring-yellow-400">
            X
        </button>
    </>
);

const columns = [
    {
        name: 'Id',
        selector: row => row._id,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "8vh"
    },
    {
        name: 'Nombre',
        selector: row => row.name_resource,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "70vh"

    },
    {
        name: 'Descipción',
        selector: row => row.description,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "70vh"

    },
    {
        name: 'Url',
        selector: row => row.url,
        sortable: true,
        compact: true,
        minWidth: "5vh",
        maxWidth: "70vh"

    },

];
const Resource = () => {

    const [cargando, setCargando] = useState(true)
    const [resource, setResource] = useState([]);
    const USER = JSON.parse(localStorage.getItem("user"));

    const [selectedRows, setSelectedRows] = useState(false);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = resource.filter(
        item => item.name_resource && item.name_resource.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {

        const handleDeleteResource = async () => {
            setToggleCleared(!toggleCleared);
            console.log('delete')

        }
        const handleEditResource = async () => {
            console.log('edit', selectedRows[0].url )
        };

        return (
            <div className="space-x-4">
               <button key="view" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border border-green-500 rounded">
                    Ver Recurso
                </button>
                <button key="edit" onClick={handleEditResource} className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border border-yellow-500 rounded">
                    Editar
                </button>
                <button key="delete" onClick={handleDeleteResource} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border border-red-500 rounded">
                    Eliminar
                </button>
            </div>
        );
    }, [resource, selectedRows, toggleCleared]);

    const getResource = async () => {
        let _responseResource = null;

        try {
            _responseResource = await fetch(`${process.env.REACT_APP_API_URL}resource/`, {
                method: "GET",
                headers: {
                    token: process.env.REACT_APP_SECRET_TOKEN,
                },
            })

        } catch (e) {
            mostrarExitoEditar("Error", "No se encontró conexión con el servidor", "error")
            setCargando(false);
            return;
        }
        let _resource = await _responseResource.json();
        setCargando(false);
        setResource((resource) => [...resource, ..._resource.res])
    }

    useEffect(() => {
        getResource();
    }, [])


    return (
        <div>
            <NavComponent data={USER} />
            <div className="grid grid-col-2 ml-60">
                <div className="flex justify-between p-4">
                    <div></div>
                    <div>
                        <h3 className="uppercase  tracking-wider text-xl font-bold">Recursos </h3>
                    </div>
                    <div>
                        {cargando ? <div className=" spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500 " role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : <div> </div>}

                    </div>
                </div>
                <div>
                    {!cargando && /*console.log(userProgress)  */
                        <div className="">
                            <DataTable
                                title="Lista de Recursos"
                                columns={columns}
                                data={filteredItems}
                                fixedHeader={true}
                                fixedHeaderScrollHeight="350px"
                                pagination
                                selectableRows

                                subHeader
                                subHeaderComponent={subHeaderComponentMemo}
                                paginationResetDefaultPage={resetPaginationToggle}
                                persistTableHead

                                contextActions={contextActions}
                                selectableRowsSingle={true}
                                onSelectedRowsChange={handleRowSelected}
                                clearSelectedRows={toggleCleared}
                            />
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Resource;