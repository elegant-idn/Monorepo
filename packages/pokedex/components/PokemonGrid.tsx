"use client"

import { useState, useEffect } from "react";
import { DataGrid, GridEventListener } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

interface PokemonProps {
    name: string,
    url: string,
}

export const PokemonGrid = () => {
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon');
            const result = await res.json();
            setData(result.results);
        }
        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        router.push(`/pokemon/${params.id}`);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'url', headerName: 'URL', width: 400 },
    ];

    return (
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={data.map((pokemon: PokemonProps, index: number) => ({
                    id: index + 1,
                    name: pokemon.name,
                    url: pokemon.url
                }))}
                columns={columns}
                pageSizeOptions={[5]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                onRowClick={handleRowClick}
                sx={{
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                    // pointer cursor on ALL rows
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer'
                    }
                }}
            />
        </div>
    )
}