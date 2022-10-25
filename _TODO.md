# COSAS PENDIENTES

Todas estas cosas se pueden plantear y desarrollarlas por encima

## UPDATE _COMPONENTE_ Table

- tomar el valor del input del numero de tokens
- hopiumGains queda pendiente de actualizar dependiendo del valor puesto por el input
- crear objeto con variables para pasárselo al resumen del portfolio

## NUEVO _COMPONENTE_ Header

- input para seleccionar la divisa
- menú de configuración

### NUEVO _COMPONENTE_ Input para seleccionar divisa _currency-option_

Coingecko te da la opción a través del siguiente request URL
https://api.coingecko.com/api/v3/simple/supported_vs_currencies

Y te devuelve el siguiente array
[ "btc", "eth", "ltc", "bch", "zar", ... , "xdr", "xag", "xau", "bits", "sats" ]

### NUEVO _COMPONENTE_ Menu de configuración

Al hacer click sobre el menú, se oculta el componente principal y se muestra unicamente el componente configuracion
Desde ahí podremos, en principio, seleccionar lo siguiente:

- Selección de divisa
- Seleccion de forma de representar ganacias [ % | X ]
- Seleccion de tema por defecto

> Si sales de la página y quieres volver a entrar, yo obtaría por tirar de _local storage_ para mantener ese estado (es como sabría hacerlo)

💡💡 Posibilidad en el futuro de añadir cosas cómo... ya severá 🤙

- 💡 Opcion lenguaje -> español, alemán e inglés... Podría funcionar a través de github abierto para la comunidad crypto...who knows?
- 💡 Elegir entre 3 plantillas (por ejemplo) para compartir por twitter

### NUEVO _COMPONENTE_ ResumePortfolio

Para hacer este componente, el componente _search.component_ tiene que estar dentro de una _mat-card_. Una vez que se crea la tabla, aparece un resumen del portfolio a la derecha de la carta de search, que se rodará hacia la izquierda para hacer hueco.

El resumen de porfolio se puede mostrar un _gráfico de queso_ con la composición del portfolio. El porcentaje ( % ) o multiplo ( X ) total del mismo, según se haya elegido y los hopium gains.

> mostrar los hopium gains con el boton para ocultarlo con asteriscos.

### NUEVO _SERVICIO_ _currency-selected_

El componente _currency-option_ va a actualizar la variable _selectedCurrency_ del servicio

La variable _selectedCurrency_ se le va a pasar a:

- metodo getCoinData( id, selectedCurrency ) del componente de api
- componente _table.component.html_
- quizás el componente _search_ si se muestra el precio en el input

> Para poder usar el símbolo de la divisa, en app/hopiumfolio/utils existe un json file _currency-list.json_ de la forma _{id: string, symbol:string, currency:string}_ se puede buscar en esa lista por id y devolvernos el simbolo de la divisa que seleccionamos.

### NUEVO _SERVICIO_ _price-change_

Parecido al servicio _currency-selected_ En este caso, el usuario puede elegir entre [ % | X ]. Se modifica una variable con '%' o 'X' y se le inyecta al componente tabla.

> Desde este servicio se tiene que poder actualizar la variable _hopiumMultiply_ ya que el valor cambia ( 200% vs 2 X )

### ADD Coingecko al Footer

<a href="https://www.coingecko.com" target="_blank" rel="noreferrer nofollow"><div class="coingecko-wrapper"><span>Hopium given by</span><img src="https://www.marketcapof.com/prefetch/coingecko.svg" alt="coingecko" width="88" height="23"></div></a>
