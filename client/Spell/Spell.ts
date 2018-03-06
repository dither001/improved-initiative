import { Listable } from "../../common/Listable";
import { probablyUniqueString } from "../../common/Toolbox";

export interface Spell extends Listable {
    Source: string;
    Level: number;
    School: string;
    CastingTime: string;
    Range: string;
    Components: string;
    Duration: string;
    Classes: string[];
    Description: string;
    Ritual: boolean;
}

export class Spell {
    public static GetKeywords = (spell: Spell) => [spell.Name, spell.School, ...spell.Classes].join(" ");

    public static Default: () => Spell = () => {
        return {
            Id: probablyUniqueString(),
            Version: process.env.VERSION,
            Name: "",
            Source: "",
            CastingTime: "",
            Classes: [],
            Components: "",
            Description: "",
            Duration: "",
            Level: 0,
            Range: "",
            Ritual: false,
            School: "",
        };
    }
}
