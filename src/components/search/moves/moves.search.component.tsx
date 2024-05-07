import {useSearchParams} from "next/navigation";
import {Pokemon_V2_Move_Bool_Exp, useMovesQuery} from "@/graphql/generated";
import PropTypes from "prop-types";
import classes from "@/components/search/pokemons/pokemons.search.component.module.css";

function MovesSearchComponent({updateCount}: any) {
    const searchParams = useSearchParams()

    let queryVariables: Pokemon_V2_Move_Bool_Exp = {};

    const moveClass = decodeURI(searchParams.get("move-class")!);
    if (moveClass !== 'null' && moveClass) {
        queryVariables.pokemon_v2_movedamageclass = {
            name: {
                _eq: moveClass
            }
        };
    }

    const powerPoints = decodeURI(searchParams.get("power-points")!);
    if (powerPoints !== 'null' && powerPoints) {
        queryVariables.pp = {
            _gt: Number(powerPoints)
        };
    }


    const { data, isLoading, error } = useMovesQuery(
        {
            "where": queryVariables
        }
    )

    if(!isLoading && !error) {
        updateCount(data?.pokemon_v2_move.length);
    }


    return (
        <ul className={classes["list"]}>
            {
                data?.pokemon_v2_move.map(
                    (move) => (
                        <li
                            key={move.name}
                            className={classes["list__item"]}>{move.name}</li>
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

MovesSearchComponent.prototype = {
    updateCount: PropTypes.object.isRequired
}

export default MovesSearchComponent;
