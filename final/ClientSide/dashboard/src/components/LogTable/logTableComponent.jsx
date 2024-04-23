import EachLog from "./EachLog"
function LogTableComponent({ item, parentFunction,pid,tid ,flag}) {
    
    return (
        <>
            {
                item.logs.map((eachLog) => (
                    <EachLog flag={flag} pid={pid} tid={tid} item={item} parentFunction={parentFunction} eachLog={eachLog} />
                ))

            }

        </>
    )
}

export default LogTableComponent