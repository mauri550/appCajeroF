$(document).ready(function () {
    var valorLcd = "";
    localStorage.setItem('monto', 0);
    desactivarOpciones()


    $(".numero").click(function () {

        valorLcd = valorLcd + $(this).text()

        // console.log(parseFloat(valorLcd))
        if (parseFloat(valorLcd) > 0) {
            activarControl("#btn-abonar");
            activarControl("#btn-retirar");
        }

        activarControl("#clearValueLCD");
        $("#lcdScreen").text(valorLcd)

    });

    $("#clearValueLCD").click(function () {
        clearCajero()
    });

    function clearCajero() {
        $("#lcdScreen").text('Ingrese Un monto.');
        valorLcd = "";
        desactivarOpciones()
        

    }

    function desactivarOpciones() {
        desactivarControl("#btn-abonar");
        desactivarControl("#btn-retirar");
        desactivarControl("#clearValueLCD");
    }

    function desactivarControl(id) {
        $(id).css({
            background: '#ccc',
            cursor: 'default'
        });
        $(id).removeClass('btn-activo');
    }

    function activarControl(id) {
        $(id).css({
            background: '#c4e0ff',
            cursor: 'pointer'
        });
        $(id).addClass('btn-activo');
    }

    $("#btn-abonar").click(function() {
        if ($(this).hasClass( "btn-activo" )) {
            // alert("hola")
            Abonar(parseFloat(valorLcd));
        }
    });

    $("#btn-retirar").click(function() {
        if ($(this).hasClass( "btn-activo" )) {
            // alert("hola")
            Retirar(parseFloat(valorLcd));
        }
    });

    $("#btn-saldo").click(function() {
        alert("Su Saldo es: $"+localStorage.getItem('monto'));
    });

    // function useStorage(name, value) {
    //    localStorage.setItem(name, value);
    // }

    function Abonar(monto) {

        monto += parseFloat(localStorage.getItem('monto'));
        localStorage.setItem('monto', monto);
        clearCajero()
        alert("Se realizo un abono de $"+ monto);
    }

    function Retirar(monto) {

        if (monto <= parseFloat(localStorage.getItem('monto'))) {
            retiro = monto;
            monto = parseFloat(localStorage.getItem('monto')) - monto;
            localStorage.setItem('monto', monto);
            alert("Se realizo un retiro de $" + retiro +" | Nuevo Saldo: $" +monto);
            clearCajero()
        }
        else {
            alert("No puede retirar, Fondos Insuficientes");
            clearCajero()
        }

    }


});