import React from "react";
import './Expanded.less';

const Expanded: React.FC<any> = ({record}) => {
    console.log(record);
    return <table className="table-expanded">
        <thead>
        <tr>
            <th colSpan={2}>Центров</th>
            <th colSpan={4}>Учителей</th>
            <th colSpan={4}>Учеников</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><b>Всего:</b> {record.number_of_centers.all}</td>
            <td><b>Активные:</b> <span className="success">{record.number_of_centers.active}</span></td>

            <td><b>Всего:</b> {record.number_of_teachers.all}</td>
            <td><b>Открытых:</b> <span className="success">{record.number_of_teachers.open}</span></td>
            <td><b>Активных:</b> <span className="primary">{record.number_of_teachers.active}</span></td>
            <td><b>Тестовых:</b> <span className="warning">{record.number_of_teachers.open}</span></td>

            <td><b>Всего:</b> {record.number_of_students.all}</td>
            <td><b>Открытых:</b> <span className="success">{record.number_of_students.open}</span></td>
            <td><b>Активных:</b> <span className="primary">{record.number_of_students.active}</span></td>
            <td><b>Тестовых:</b> <span className="warning">{record.number_of_students.open}</span></td>
        </tr>
        <tr>
            <td colSpan={2}/>
            <td colSpan={4}>
                <b>Стоимость:</b> {record.number_of_teachers.cost} сум
            </td>
            <td colSpan={4}>
                <b>Стоимость:</b> {record.number_of_students.cost} сум
            </td>
        </tr>
        </tbody>
    </table>
};

export default Expanded;