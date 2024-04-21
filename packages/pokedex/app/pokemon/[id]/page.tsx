"use client"

import { useState, useEffect } from "react";

interface PageProps {
    params: {
        id: string;
    };
}

interface PokemonProps {
    abilities: {
        ability: {
            name: string,
            url: string,
        }
        is_hidden: Boolean,
        slot: number
    }[],
    base_experience: number,
    cries: {
        latest: string,
        legacy: string
    },
    forms: {
        name: string,
        url: string,
    }[],
    game_indices: {
        game_index: number,
        version: {
            name: string,
            url: string
        }
    }[],
    height: number,
    held_items: [],
    id: number,
    is_default: Boolean,
    location_area_encounters: string,
    moves: {
        move: {
            name: string,
            url: string,
        },
        version_group_details: {
            level_learned_at: number,
            move_learn_method: {
                name: string,
                url: string,
            },
            version_group: {
                name: string,
                url: string,
            }
        }[],
    }[],
    name: string,
    order: number,
    past_abilities: [],
    past_types: [],
    species: {
        name: string,
        url: string,
    }
}

export default function Page({ params: { id } }: PageProps) {
    const [pokemon, setPokemon] = useState<PokemonProps | null>(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const result = await res.json();
            setPokemon(result);
        }
        fetchData();
    }, []);

    return (
        <div style={{ marginTop: "64px", padding: "32px", display: "flex", gap: "16px", justifyContent: "center", flexDirection: "column", width: "100%" }}>
            <h1 style={{ textAlign: "center" }}>Name: {pokemon?.name}</h1>
            <h1 style={{ textAlign: "center" }}>Base Experience: {pokemon?.base_experience}</h1>
            <h1 style={{ textAlign: "center" }}>Height: {pokemon?.height}</h1>
            <h1 style={{ textAlign: "center" }}>Order {pokemon?.order}</h1>
        </div>
    )
}