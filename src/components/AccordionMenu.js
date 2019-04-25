import React, {createRef} from 'react'
import {
    Button,
    Image,
    Menu,
    Segment,
    Sidebar,
    Container, Accordion, Icon
} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {MAIN_PAGE, path} from "../Views";
// this shit isn't react style. need to locate components inside
class AccordionMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            segmentRef: createRef(),
            activeIndex: 0,
        };

    }

    handleHideClick = () => {
        let newV = this.state.visible;
        console.log(!newV);
        this.setState({visible: !newV});
    };
    handleShowClick = () => this.setState({visible: true});

    handleSidebarHide = () => this.setState({visible: false});
    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({activeIndex: newIndex})
    };

    render() {

        return (
            <Container fluid>
                {/*<Button.Group>*/}
                    {/*<Button disabled={this.state.visible} onClick={this.handleShowClick}>*/}
                        {/*Show sidebar*/}
                    {/*</Button>*/}
                    {/*<Button disabled={!this.state.visible} onClick={this.handleHideClick}>*/}
                        {/*Hide sidebar*/}
                    {/*</Button>*/}
                {/*</Button.Group>*/}
                <Sidebar.Pushable className={'sidebar-container'}>
                    <Sidebar
                        as={Menu}
                        vertical
                        fixed={'left'}
                        inverted
                        borderless
                        animation='push'
                        onHide={this.handleSidebarHide}
                        target={this.state.segmentRef}
                        visible={this.state.visible}
                        // visible={true}
                        width='thin'
                        // style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
                    >
                        <Accordion  inverted>
                            <Accordion.Title active={this.state.activeIndex === 0} index={0} key={34}
                                             onClick={this.handleClick}>
                                <Icon name='dropdown'/>
                                asdafaa
                            </Accordion.Title>
                            <Accordion.Content style={{marginLeft: '2em'}} key={23} active={this.state.activeIndex === 0}>
                                <Link to={path + MAIN_PAGE}>qweqe</Link>
                            </Accordion.Content>
                            <Accordion.Content style={{marginLeft: '2em'}} key={233} active={this.state.activeIndex === 0}>
                                <Link to={path + MAIN_PAGE}>qweqe</Link>

                                {/*possible here <Divider/>*/}
                            </Accordion.Content>
                            <Accordion.Title active={this.state.activeIndex === 1} index={1} key={46}
                                             onClick={this.handleClick}>
                                <Icon name='dropdown'/>
                                sadfadf
                            </Accordion.Title>
                            <Accordion.Content key={64} style={{marginLeft: '2em'}} active={this.state.activeIndex === 1}>
                                <Link to={path + MAIN_PAGE}>qweqe</Link>

                                {/*possible here <Divider/>*/}
                            </Accordion.Content>
                        </Accordion>
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Button icon='cog' onClick={this.handleHideClick}/>
                        <Segment basic style={{  visibility: 'hidden'}}>
                            <Image size={'massive'} src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        </Segment>
                    </Sidebar.Pusher>
                    {/*<Sidebar.Pusher>*/}
                        {/*<Button icon='cog' onClick={this.handleHideClick}/>*/}
                        {/*<Segment basic>*/}
                            {/*<router-view></router-view>*/}
                        {/*</Segment>*/}
                    {/*</Sidebar.Pusher>*/}
                </Sidebar.Pushable>

            </Container>
        )
    }
}


export default AccordionMenu;
