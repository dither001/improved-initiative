module ImprovedInitiative {
    export class StatBlockListing {
        Name: KnockoutObservable<string>;
        IsLoaded: boolean;
        StatBlock: KnockoutObservable<StatBlock>;
        constructor(public Id: string, name: string, public Keywords: string, public Link: string, public Source: string, statBlock?: StatBlock) {
            this.Name = ko.observable(name);
            this.IsLoaded = !!statBlock;
            this.StatBlock = ko.observable(statBlock || { ...StatBlock.Default(), Name: statBlock.Name });
            this.StatBlock.subscribe(newStatBlock => {
                this.Name(newStatBlock.Name);
                this.Keywords = newStatBlock.Type;
            });
        }

        LoadStatBlock = (callback: (listing: StatBlockListing) => void) => {
            if (this.IsLoaded) {
                callback(this);
            }
            else {
                $.getJSON(this.Link, (json) => {
                    this.IsLoaded = true;
                    this.StatBlock({ ...StatBlock.Default(), ...json });
                    callback(this);
                });
            }
        }
    }
}