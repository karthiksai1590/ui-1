import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

var uniqueKeys = (data: any) => {
    if (data && data.length > 0)
        return Object.keys(data.reduce(function (result: any, obj: any) {
            return Object.assign(result, obj);
        }, {}))
    else return [];
}
const RenderTableHeader = (headers: any) => {
    return (<>
        <TableHead>
            <TableRow>
                {headers && headers.headers.map((h: any) => {
                    if (['_id', '__v'].includes(h)) return null
                    else return (<TableCell key={h}>{h}</TableCell>)
                })}
            </TableRow>
        </TableHead>
    </>)
}
const addTableRow = (headers: any, result: any, editFn: any, deleteFn: any) => {
    return (<>
        <TableRow key={result?._id}>
            {headers && headers.map((h: any) => {

                if (h == 'actions') {
                    return (
                        <TableCell component="th" scope="row">
                            {<EditIcon color="primary" onClick={() => editFn(result['_id'])} />}
                            {<DeleteIcon color="secondary" onClick={() => deleteFn(result['_id'])} />}
                            {<button color="secondary" type="button">Create SubModule </button>}
                        </TableCell>
                    )
                } else {
                    if (['_id', '__v'].includes(h)) return null
                    else return (
                        <TableCell component="th" scope="row">
                            {result[h]}
                        </TableCell>

                    )
                }

            })}
        </TableRow>
    </>)
}
type RenderTableDataProps = {
    headers: any;
    results: any;
    editFn: any;
    deleteFn: any;
};
const RenderTableData: React.FC<RenderTableDataProps> = ({ headers, results, editFn, deleteFn }) => {

    return (<>
        <TableBody>
            {results.map((result: any) => {
                return addTableRow(headers, result, editFn, deleteFn)
            })}
        </TableBody>
    </>)
}

type Props = {
    dataArray: any;
    editFn: any;
    deleteFn: any;
};
const DynamicTable: React.FC<Props> = ({ dataArray, editFn, deleteFn }): JSX.Element => {
    for (let _data of dataArray) {
        _data['actions'] = ""
    }
    const heads = uniqueKeys(dataArray);
    return (<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <RenderTableHeader headers={heads} />
                <RenderTableData headers={heads} results={dataArray} editFn={editFn} deleteFn={deleteFn} />

            </Table>
        </TableContainer>
    </>);
};

export default DynamicTable;

