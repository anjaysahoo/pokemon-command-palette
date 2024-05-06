import {FilterModel} from "@/models/filter.model";

const filterConfig: FilterModel[] = [
    {
        "label": "Pokemons",
        "value": "pokemons",
        "options": [
            {
                "label": "Generation",
                "value": "generation",
                "inputType": "radio",
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
                "inputType": "radio",
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
                "inputType": "checkbox",
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
                        "label": "Cave",
                        "value": "cave",
                    }
                ]
            }
        ]

    },
    {
        "label": "Moves",
        "value": "moves",
        "options": [
            {
                "label": "Move Class",
                "value": "move-class",
                "inputType": "radio",
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
                "inputType": "radio",
                "options": [
                    {
                        "label": "above 10",
                        "value": "pp > 10"
                    },
                    {
                        "label": "above 15",
                        "value": "pp > 15"
                    },
                    {
                        "label": "above 20",
                        "value": "pp > 20"
                    }
                ]
            }
        ]
    }
]

export default filterConfig;
