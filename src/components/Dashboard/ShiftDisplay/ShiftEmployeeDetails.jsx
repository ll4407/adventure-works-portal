function ShiftEmployeeDetails(props) {

    const { firstName, middleName, lastName, suffix} = props;

    return (
        <p>{firstName} {middleName} {lastName} {suffix}</p>
    )
}

export default ShiftEmployeeDetails;