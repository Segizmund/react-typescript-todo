import {AppBar,IconButton, Typography,Toolbar,Button} from "@mui/material";
import {Menu} from '@mui/icons-material'
import { MenuButton } from './MenuButton'
import Switch from '@mui/material/Switch'

type ThemeInfo ={
    theme: any
}
export const Header = ({theme}:ThemeInfo) => {
    return (
        <AppBar className={"container-fluid"} position={"static"}>
            <Toolbar className={"d-flex justify-content-between"}>
                <div className={"d-flex"}>
                    <IconButton className={"p-0 me-2"} edge={"start"} color={"inherit"} arial-label={"Menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoList
                    </Typography>
                </div>
                <div>
                    <MenuButton background={theme.palette.primary.dark}>Логин</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Логин</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} />
                </div>
            </Toolbar>
        </AppBar>
    )
}