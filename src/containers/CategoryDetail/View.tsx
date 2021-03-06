import React from 'react'
import { Component } from 'react'
import { BaseView, GameListItem } from '../../components'
import { View } from 'react-native'
import { PacmanIndicator } from 'react-native-indicators'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../../config/Constants'
import { hp } from '../../config/Utils'
import style from './style'
export default class CategoryDetail extends Component <CategoryDetailProps, CategoryDetailState> {

    constructor(props: CategoryDetailProps) {
        super(props)
        this.state = {
            page: 0
        }
        this.nextPage = this.nextPage.bind(this)
    }

    componentDidMount() {
        const { getCategoryGames, category } = this.props
        this.setState({page: 0})
        getCategoryGames(category.id, this.state.page)
    }

    nextPage() {
        const { page } = this.state
        const { loading, category, getCategoryGames } = this.props
        if (!loading) {
            getCategoryGames(category.id, page + 1)
            this.setState({ page: page + 1 })
        }
    }

    detailView(game: any) {
        Actions.gameDetail({game})
    }
    render() {
        const { category, games, loading } = this.props
        const { page } = this.state
        return (
            <BaseView title={category.name} back={true}  onScrollEnd={this.nextPage}>
                {loading && page === 0  &&
                    <View style={style.loading}>
                        <PacmanIndicator color={Colors.secondary_red} animating={loading} size={hp('10%')}/>
                    </View>
                }
                {
                    games && games.map((game: any) =>
                        game.id ?
                        <GameListItem game={game} key={`${game.id}${game.slug}`}
                            onPress={() => {this.detailView(game)}}></GameListItem>
                        : undefined
                    )
                }
            </BaseView>
        )
    }

}
