import {FilterModel} from "@/models/filter.model";
import {InputType, PrimaryKeyValue} from "@/config/app-constants.config";

const filterConfig: FilterModel[] = [
    {
        "label": "Pokémon",
        "value": PrimaryKeyValue.POKEMONS,
        "options": [
            {
                "label": "Generation",
                "value": "generation",
                "inputType": InputType.RADIO,
                "options": [
                    {
                        "label": "Generation I",
                        "value": "generation-i",
                    },
                    {
                        "label": "Generation II",
                        "value": "generation-ii",
                    },
                    {
                        "label": "Generation III",
                        "value": "generation-iii",
                    }
                ]
            },
            {
                "label": "Color",
                "value": "color",
                "inputType": InputType.RADIO,
                "options": [
                    {
                        "label": "Red",
                        "value": "red",
                    },
                    {
                        "label": "Blue",
                        "value": "blue",
                    },
                    {
                        "label": "Green",
                        "value": "green",
                    }
                ]
            },
            {
                "label": "Habitat",
                "value": "habitat[]",
                "inputType": InputType.CHECKBOX,
                "options": [
                    {
                        "label": "Grassland",
                        "value": "grassland",
                    },
                    {
                        "label": "Mountain",
                        "value": "mountain",
                    },
                    {
                        "label": "Water",
                        "value": encodeURI("water's edge"),
                    }
                ]
            }
        ]

    },
    {
        "label": "Moves",
        "value": PrimaryKeyValue.MOVES,
        "options": [
            {
                "label": "Move Class",
                "value": "move-class",
                "inputType": InputType.RADIO,
                "options": [
                    {
                        "label": "Physical",
                        "value": "physical",
                    },
                    {
                        "label": "Special",
                        "value": "special",
                    },
                    {
                        "label": "Status",
                        "value": "status",
                    }
                ]
            },
            {
                "label": "Power points",
                "value": "power-points",
                "inputType": InputType.RADIO,
                "options": [
                    {
                        "label": "above 10",
                        "value": "10"
                    },
                    {
                        "label": "above 15",
                        "value": "15"
                    },
                    {
                        "label": "above 20",
                        "value": "20"
                    }
                ]
            }
        ]
    }
]

export default filterConfig;
