class Utilities {

    getDia(arreglo: any[], index: number) {
        let dia_dt = new Date(arreglo[index].dt_txt);
        var dias_semana: Object = { weekday: "long" };
        let d1_conv = new Intl.DateTimeFormat('es-ES', dias_semana).format(dia_dt);
        const dia = d1_conv.charAt(0).toUpperCase() + d1_conv.slice(1);
        return dia;
    }

    getFecha(arreglo: any[], index: number) {
        const fecha = arreglo[index].dt_txt.split(" ")[0];
        const auxDate = fecha.split("-");
        const formattedDate = auxDate[2] + "/" + auxDate[1];
        return formattedDate;
    }

    getMax(arreglo: any[], index: number, index2: number) {
        var max: number = -9999;
        for (let i: number = index; i < index2; i++) {
            if (arreglo[i].main.temp_max > max) {
                max = arreglo[i].main.temp_max;
            }
        }
        return Math.round(max - 273.15);
    }

    getMin(arreglo: any[], index: number, index2: number) {
        var min: number = 9999;
        for (let i: number = index; i < index2; i++) {
            if (arreglo[i].main.temp_min < min) {
                min = arreglo[i].main.temp_min;
            }
        }
        return Math.round(min - 273.15);
    }
    getSkyState(arreglo: any[], index: number) {

        let icon: string = "null";
        var state: string = arreglo[index].weather[0].description;

        if (state === 'clear sky') {
            state = 'Despejado';
            icon = "http://localhost:5000/uploads/987761ba-9045-464b-a807-1736a895e22e.svg";
        }
        else if (state === 'few clouds' || state === 'overcast clouds') {
            state = 'Parcialmente nublado';
            icon = "http://localhost:5000/uploads/22904436-4bdb-453d-b74a-4f41240f747e.svg";
        }
        else if (state === 'broken clouds' || state === 'scattered clouds') {
            state = 'Nubes dispersas';
            icon = "http://localhost:5000/uploads/ee500304-26f5-415a-aa09-fd52a1073e44.svg";
        }
        else if (state === "light rain"  || state === "moderate rain") {
            state = "Lluvia ligera";
            icon = "http://localhost:5000/uploads/8cfbbfc4-3c86-4235-b243-30b6a3143494.svg";
        }
        else {
            state = state;
        }

        let response: Object = {
            state: state,
            icon: icon
        };
        return response;
    }
}

export default Utilities;