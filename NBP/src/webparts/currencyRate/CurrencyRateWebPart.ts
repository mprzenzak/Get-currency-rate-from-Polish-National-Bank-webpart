import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CurrencyRateWebPart.module.scss';
import * as strings from 'CurrencyRateWebPartStrings';

export interface ICurrencyRateWebPartProps {
  description: string;
}

export default class CurrencyRateWebPart extends BaseClientSideWebPart<ICurrencyRateWebPartProps> {

  
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.currencyRate}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Kursy walut na podstawie NBP</span>
              <p class="currencyName">Trwa ładowanie</p>
              </a>
            </div>
          </div>
        </div>
      </div>`;

    this.getData();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getData() {
    fetch('https://api.nbp.pl/api/exchangerates/tables/A/?FORMAT=json')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        var currencyTab = myJson[0].rates;

        var currencyNameTab = [];

        for (var i = 0; i < currencyTab.length; i++) {

          var currency = {
            name: currencyTab[i].currency,
            value: currencyTab[i].mid
          }
          var exactPlnValue = 1 / currency.value;
          var plnValue = exactPlnValue.toFixed(4);
          var currencyDisplay = "<br>" + `<span class="${styles.title}">${currency.name}</span>`
          + "<br>" + "Zakup waluty: " + currency.value + "<br>" + "Zakup złotówki za daną walutę: " + plnValue;
          currencyNameTab.push(currencyDisplay);
        }
        this.domElement.getElementsByClassName("currencyName")[0].innerHTML = currencyNameTab.toString();
      });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
