import {useSearchParams} from "next/navigation";
import {Order_By, usePokemonsQuery} from "@/graphql/generated";
import classes from "./pokemons.search.component.module.css";
import PropTypes from "prop-types";

function PokemonsSearchComponent({updateCount}: any) {
    const searchParams = useSearchParams()

    searchParams.forEach((value, key) => {
        console.log(value, key);
    });

    const { data, isLoading, error } = usePokemonsQuery(
        {
            "where": {
                "pokemon_v2_generation": { "name": { "_eq": "generation-iii" } },
                "pokemon_v2_pokemoncolor": { "name": { "_eq": "green" } },
                "pokemon_v2_pokemonhabitat": {
                    "pokemon_v2_pokemonhabitatnames": { "name": { "_in": ["grassland", "mountain", "water's edge"] } }
                }
            },
            "order_by": {
                "id": Order_By.Asc
            }
        }
    )

    if(!isLoading && !error) {
        updateCount(data?.pokemons.length);
    }



    console.log("data :", data);
    console.log("isLoading :", isLoading);
    console.log("error :", error);

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
