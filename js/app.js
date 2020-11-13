new Vue({
    el: "#App",
    data:{
        monedas:{},
        cantidad: 0,
        from: 'EUR',
        to: 'USD',
        result: 0
    },
    mounted(){
        this.getMonedas()
    },
    computed:{
        formatearMonedas(){
            return Object.values(this.monedas);
        },
        calcularResultado(){
            return (Number(this.cantidad)*this.result).toFixed(2);
        },
        deshabilitado(){
            return this.cantidad === 0 || !this.cantidad;
        }
    },
    methods:{
        getMonedas(){
            const monedas = localStorage.getItem("monedas");
            if(monedas){
                this.monedas = JSON.parse(monedas);
                return;
            }
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=d4fa468b06a8cd54593b')
            .then(response =>{
                this.monedas = response.data.results;
                localStorage.setItem('monedas', JSON.stringify(response.data.results));
                console.log(response);
            });
        },
        convertirMoneda(){
            const busqueda = `${this.from}_${this.to}`; 
            axios.get(`https://free.currconv.com/api/v7/convert?q=${busqueda}&apiKey=d4fa468b06a8cd54593b`)
            .then((response) => {
                console.log(response)
                this.result = response.data.results[busqueda].val;
            })
        }
    },

    watch:{
        from(){
            this.result = 0;
        },
        to(){
            this.result = 0;
        } 
    }

});

function capturar(){
    function historial(moneda, cantidad, equivalencia, resultado){
        this.moneda = moneda;
        this.cantidad = cantidad;
        this.equivalencia = equivalencia;
        this.resultado = resultado;
    }

    var cmb1 = document.getElementById('mon1').value;
    var cmb2 = document.getElementById('mon2').value;

    if(cmb1 == cmb2){
        swal("Opps", "Las monedas deben ser distintas", "error");
    }else{
        var CapturarMoneda1 = document.getElementById('mon1').value;
        var CapturarCantidad = document.getElementById('cantidad').value;
        var CapturarMoneda2 = document.getElementById('mon2').value;
        var CapturarResultado = document.getElementById('resultado').textContent;
        dato = new historial(CapturarMoneda1,CapturarCantidad,CapturarMoneda2,CapturarResultado)
        agregar();        
    }
}
var array = [];
function agregar(){
    array.push(dato);
    document.getElementById('tabla').innerHTML +='<tbody><td>' + dato.moneda + '</td><td>' + '$'+ dato.cantidad + '</td><td>' + dato.equivalencia + '</td><td>' + dato.resultado  + '</td></tbody>';
}
