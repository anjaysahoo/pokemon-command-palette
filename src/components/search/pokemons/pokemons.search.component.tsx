import {useSearchParams} from "next/navigation";
import {Order_By, Pokemon_V2_Pokemonspecies_Bool_Exp, usePokemonsQuery} from "@/graphql/generated";
import classes from "./pokemons.search.component.module.css";
import PropTypes from "prop-types";

function PokemonsSearchComponent({updateCount}: any) {
    const searchParams = useSearchParams();

    let queryVariables: Pokemon_V2_Pokemonspecies_Bool_Exp = {};

    const generation = decodeURI(searchParams.get("generation")!);
    if(generation !== 'null' && generation) {
        queryVariables["pokemon_v2_generation"] = { "name": { "_eq": generation } };
    }

    const color = decodeURI(searchParams.get("color")!);

    if(color !== 'null' && color) {
        console.log("color :", typeof color);
        queryVariables["pokemon_v2_pokemoncolor"] = { "name": { "_eq": color } };
    }

    const habitat = searchParams.getAll("habitat[]").map((val) => decodeURI(val))
    if(habitat.length > 0 && habitat) {
        queryVariables["pokemon_v2_pokemonhabitat"] = {
            "pokemon_v2_pokemonhabitatnames": {"name": {"_in": habitat}}
        }
    }


    const { data, isLoading, error } = usePokemonsQuery(
        {
            "where": queryVariables,
            "order_by": {
                "id": Order_By.Asc
            }
        }
    )

    if(!isLoading && !error) {
        updateCount(data?.pokemons.length);
    }


    return (
        <ul className={classes["list"]}>
            {
                data?.pokemons.map(
                    (pokemon) => (
                        <li
                            key={pokemon.id}
                            className={classes["list__item"]}>{pokemon.name}</li>
                    )
                )
            }
            {
                isLoading &&
                <>
                    <li className={classes["list__item-loader"]}></li>
                    <li className={classes["list__item-loader"]}></li>
                    <li className={classes["list__item-loader"]}></li>
                    <li className={classes["list__item-loader"]}></li>
                    <li className={classes["list__item-loader"]}></li>
                    <li className={classes["list__item-loader"]}></li>
                </>
            }
            {
                error !== null && <p>Error</p>
            }
        </ul>
    )
}

PokemonsSearchComponent.prototype = {
    updateCount: PropTypes.object.isRequired
}

export default PokemonsSearchComponent;
