import React, {useCallback, useEffect, useRef, useState} from 'react';
import './ui/Table.scss';

// Создание ссылок на заголовки колонок
const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item, // текст заголовка
        ref: useRef() // ссылка на соответсвующий элемент заголовка
        // ссылки используются для вычисления текущего положения и ширины столбцов
    }));
}

const Table = ({headers, tableContent, minCellWidth, onOpenModal}) => {
    // начальная высота столбца
    const [tableHeight, setTableHeight] = useState("auto");

    // индекс столбца, на который нажали
    const [activeIndex, setActiveIndex] = useState(null);

    // реф, который ссылается DOM-элемент таблицы
    const tableElement = useRef(null);

    // массив ссылок на заголовки столбцов
    const columns = createHeaders(headers);

    // устанавливаем начальную высоту таблицы на основе текущей
    // offsetHeight = height (px) + padding + border без margin
    useEffect(() => {
        setTableHeight(tableElement.current.offsetHeight);
    }, [tableContent]);

    // устанавливает активным индекс столбца (.resize-handle),
    // на который нажал пользователь для изменения его ширины
    const mouseDown = (index) => {
        setActiveIndex(index);
    };

    // вычисление новой ширины столбцов при перемещении мыши
    const mouseMove = useCallback(
        (e) => {
            const tableRect = tableElement.current.getBoundingClientRect();

            const gridColumns = columns.map((col, i) => {
                if (i === activeIndex) {
                    // Вычисляем новую ширину столбца, учитывая позицию таблицы относительно окна
                    const width = e.clientX - tableRect.left - col.ref.current.offsetLeft + tableElement.current.scrollLeft;

                    // Ограничиваем минимальную ширину столбца
                    if (width >= minCellWidth) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current.offsetWidth}px`;
            });

            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
        },
        [activeIndex, columns, minCellWidth]
    );


    // удаление слушателей действий мыши
    const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);

    // если мышь отпущена, удаляются слушатели действий мыши
    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    // удаление и добавление слушателей событий
    useEffect(() => {
        // если активный столбец установлен, следим за действиями мыши
        if (activeIndex !== null) {
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <div className={'table-wrapper'}>
            <table ref={tableElement} className={'table-user'}>
                <thead>
                <tr>
                    {columns.map(({ref, text}, headerID) => (
                        <th ref={ref} key={headerID}>
                                <span>
                                    {text}
                                </span>
                            <div
                                style={{ height: tableHeight }}
                                onMouseDown={() => mouseDown(headerID)}
                                className={`resize-handle ${activeIndex === headerID ? 'active' : 'idle'}`}
                            />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tableContent.map((row, rowID) => (
                    <tr key={rowID}
                        onClick = {() => onOpenModal(row.id)}>
                        {row.rowData.map((cell, cellID) => (
                            <td key={cellID}>
                                    <span>
                                        {cell}
                                    </span>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;