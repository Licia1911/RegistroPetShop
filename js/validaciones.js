export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajeDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "De 6 a 12 caracteres, al menos una mayúscula y una minuscula y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX (10 numeros)"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La direccion debe tener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe tener entre 4 y 30 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El Estado debe tener entre 4 y 30 caracteres"
    }

}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeError.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();

    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}