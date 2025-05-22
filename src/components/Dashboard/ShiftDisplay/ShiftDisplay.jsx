import ShiftEmployeeDetails from './ShiftEmployeeDetails';
import styles from './ShiftDisplay.module.css'

function ShiftDisplay(props){
    const { shifts } = props;

    const dayShift = shifts.filter(shift => shift.shift === 'Day');
    const eveningShift = shifts.filter(shift => shift.shift === 'Evening');
    const nightShift = shifts.filter(shift => shift.shift === 'Night');

    //grabs current date just once   
    let currentDate = new Date();
    let date = currentDate.getDate();
    let dateName = currentDate.toLocaleDateString('default', { weekday: 'long' }); 
    let month = currentDate.toLocaleString('default', { month: 'long' });

    const dateSuffix = () => {
        //handles 4th through 20th
        if (date > 3 && date < 21) {
            return "th"
        };
        //handles the rest
        switch (date % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const displayData = shifts === null ? <p>Loading</p> :
        <>
            <h2>Shifts</h2>

            <p>{dateName}, {month} {date}{dateSuffix()}</p>

            <div className={styles.shift}>
                <p>Shift 1</p>
                {dayShift.map((person) => {
                    return (
                        <ShiftEmployeeDetails 
                            firstName={person.firstName}
                            middleName={person.middleName}
                            lastName={person.lastName}
                            suffix={person.suffix}    
                        />
                    )
                })}
            </div>
            
            <div className={styles.shift}>
                <p>Shift 2</p>
                {eveningShift.map((person) => {
                    return (
                        <ShiftEmployeeDetails 
                            firstName={person.firstName}
                            middleName={person.middleName}
                            lastName={person.lastName}
                            suffix={person.suffix}    
                        />
                    )
                })}
            </div>

            <div className={styles.shift}>
                <p>Shift 3</p>
                {nightShift.map((person) => {
                    return (
                        <ShiftEmployeeDetails 
                            firstName={person.firstName}
                            middleName={person.middleName}
                            lastName={person.lastName}
                            suffix={person.suffix}    
                        />
                    )
                })}
            </div>
        </>;

    return (
        <>
            {displayData}
        </>
    )
}


export default ShiftDisplay;