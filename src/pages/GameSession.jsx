import { Navigate, useParams } from 'react-router-dom'
import { getGame } from '../data/games.js'
import { getGameComponent } from '../games/registry.js'
import ComingSoon from './ComingSoon.jsx'

export default function GameSession() {
  const { gameId } = useParams()
  const game = getGame(gameId)
  if (!game) return <Navigate to="/games" replace />
  if (game.status !== 'live') return <ComingSoon game={game} />
  const Game = getGameComponent(game.id)
  if (!Game) return <ComingSoon game={game} />
  return <Game game={game} />
}

