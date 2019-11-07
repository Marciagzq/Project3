import React from "react";
import store from "../../../../Config/store";
import { spriteSize, mapWidth, mapHeight } from "../../../../Config/constants";

export default function move(monster) {
  function switchFacing(direction) {

  }

  setInterval(function () {
    const newMageInfo = checkMove();//attemptMove(store.getState().mage.direction)
    console.log('increment timer')
    //attemptMove(store.getState().mage.direction);
    checkMove();
    store.dispatch({
      type: 'INCREMENT_TIMER'
    })
    store.dispatch({
      type: "move_Mage",
      payload: newMageInfo

    })
  }, 500)

  function getNewPosition(oldPos, direction) {

    switch (direction) {
      case "West":
        return {
          position: [oldPos[0] - spriteSize, oldPos[1]],
          direction: "West"
        }
      case "East":
        return {
          position: [oldPos[0] + spriteSize, oldPos[1]],
          direction: "East"
        }
      case "North":
        return [oldPos[0], oldPos[1] - spriteSize]
      case "South":
        return [oldPos[0], oldPos[1] + spriteSize]
    }
  }

  //checks boundaries when the player moves
  function observeBoundaries(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= mapWidth - spriteSize) &&
      (newPos[1] >= 0 && newPos[1] <= mapHeight - spriteSize)
  }

  //checks if the tile the player is moving is an obstacle
  function observeObstacles(oldPos, newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / spriteSize;
    const x = newPos[0] / spriteSize;
    const nextTile = tiles[y][x]
    return nextTile < 5
  }

  function attemptMove(direction) {
    const oldPos = store.getState().mage.position
    const newPos = getNewPosition(oldPos, direction)

    if(observeBoundaries(oldPos, newPos) && observeObstacles(oldPos, newPos)) {
        checkMove(direction, newPos)
    }
}

  function checkMove() {
    const playerPos = store.getState().player.position
    const magePos = store.getState().mage.position
    const direction = store.getState().mage.direction

    if (playerPos[1] != magePos[1]) {

      if (playerPos[1] > magePos[1]) {
        return {
          position: [magePos[0], magePos[1] + spriteSize],
          direction//: "South"
        }
      }
      else if (playerPos[1] < magePos[1]) {
        return {
          position: [magePos[0], magePos[1] - spriteSize],
          direction//: "North"
        }
      }
    }
    else if (playerPos[0] > magePos[0] + (3 * spriteSize)) {
      return {
        position: [magePos[0] + spriteSize, magePos[1]],
        direction: "East"
      }
    }
    else if (playerPos[0] < magePos[0] - (3 * spriteSize)) {
      return {
        position: [magePos[0] - spriteSize, magePos[1]],
        direction: "West"
      }
    } else if (playerPos[0] < magePos[0] + (3 * spriteSize) && playerPos[0] > magePos[0]) {
      return {
        position: [magePos[0] - spriteSize, magePos[1]],
        direction: "East"
      }
    } else if (playerPos[0] > magePos[0] - (3 * spriteSize) && playerPos[0] < magePos[0]) {
      return {
        position: [magePos[0] + spriteSize, magePos[1]],
        direction: "West"
      }
    } else if (playerPos[0] == magePos[0] && playerPos[1] == magePos[1]) {
      const playerDir = store.getState().player.direction
      
      if (playerDir == "East"){
        return {
          position: [magePos[0] + (2 * spriteSize), magePos[1]],
          direction: "West"
        }
      } else if (playerDir == "West"){
        return {
          position: [magePos[0] - (2 * spriteSize), magePos[1]],
          direction: "East"
        }
      } else if (playerDir == "South"){
        return {
          position: [magePos[0], magePos[1] + (2 * spriteSize)],
          direction//: "South"
        }
      } else if (playerDir == "North"){
        return {
          position: [magePos[0], magePos[1] - (2 * spriteSize)],
          direction//: "North"
        }
      }
      
    }
    else {
      console.log("attack!!!")
      return {
        position: magePos,
        direction
      }

    }

  }

  return monster
}