class UtilitiesTiempo {

    getTemperature(kelvin: number) {
        let result = Math.round(kelvin - 273.15);
        return result;
    }

    getSkyState(cielo_estado: string) {
        let icon: string = "";
        var response: Object = {
            state: cielo_estado,
            icon: icon,
        }

        if (cielo_estado === 'clear sky') {
            response = {
                state: 'Despejado',
                icon: "http://localhost:5000/uploads/987761ba-9045-464b-a807-1736a895e22e.svg",
            }
        }
        else if (cielo_estado === 'few clouds' || cielo_estado === 'overcast clouds') {
            response = {
                state: 'Parcialmente nublado',
                icon: "http://localhost:5000/uploads/22904436-4bdb-453d-b74a-4f41240f747e.svg",
            }
        }
        else if (cielo_estado === 'broken clouds' || cielo_estado === 'scattered clouds') {
            response = {
                state: 'Nubes dispersas',
                icon: "http://localhost:5000/uploads/ee500304-26f5-415a-aa09-fd52a1073e44.svg",
            }
        }
        else if (cielo_estado === "light rain" || cielo_estado === "moderate rain") {
            response = {
                state: "Lluvia ligera",
                icon: "http://localhost:5000/uploads/8cfbbfc4-3c86-4235-b243-30b6a3143494.svg",
            }
        }
        else {
            response = {
                state: cielo_estado,
                icon: "00"
            }
        }
        return response;
    }

    getDate(stamp: number) {
        let today_is_stamp: Date = new Date(stamp * 1000);
        let month: number = today_is_stamp.getUTCMonth() + 1;
        let day_number: number = today_is_stamp.getUTCDate();
        let date: string = day_number + "/" + month;
        return date;
    }

    getDay() {
        let day_eng: number = new Date().getUTCDay();
        let day: string = "";

        switch (day_eng) {
            case 0: day = "Domingo"; break;
            case 1: day = "Lunes"; break;
            case 2: day = "Martes"; break;
            case 3: day = "Miércoles"; break;
            case 4: day = "Jueves"; break;
            case 5: day = "Viernes"; break;
            case 6: day = "Sábado"; break;
        }
        return day;
    }

    toCelcius(temperature: number) {
        return Math.round(temperature - 273.15)
    }

}

export default UtilitiesTiempo;