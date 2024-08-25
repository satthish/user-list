//Reusable title component which can be called in all the files to display common title style

import MainTitleProps from "@/types/MainTitleProps";
import { Divider, Typography } from "@mui/material";

const MainTitle = ({title, additionalClass}: MainTitleProps) => {
    return(
        <div className="text-center mb-2">
            <Typography variant="h4" align="center" className={`main-title text-center font-bold py-4 mb-2 mt-3 ${additionalClass || ""}`}>{title}</Typography>
            <Divider />
        </div>
    )
}

export default MainTitle;