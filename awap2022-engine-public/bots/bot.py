import sys

import random
from tkinter import E

from src.player import *
from src.structure import *
from src.game_constants import GameConstants as GC

class MyPlayer(Player):

    def __init__(self):
        print("Init")
        self.turn = 0
        self.road = [] # Road tiles
        self.tower = [] # Served population tiles
        self.towerServed = [(0,0),(0,1),(0,2),(0,-1),(0,-2),(1,0),(-1,0),(-2,0),(2,0),(1,1),(-1,1),(-1,-1),(1,-1)] 
        # Radius of 2 from tower
        return

    def find_road(self, map, player_info, obstructed): # Helper function to find road
        self.MAP_WIDTH = len(map)
        self.MAP_HEIGHT = len(map[0])

        # find tiles on my team
        my_structs = []
        widths_x = []
        widths_y = []
        for x in range(self.MAP_WIDTH):
            for y in range(self.MAP_HEIGHT):
                st = map[x][y].structure
                # check the tile is not empty
                if st is not None:
                    # check the structure on the tile is on my team
                    if st.team == player_info.team:
                        my_structs.append(st)
                        widths_x.append(x)
                        widths_y.append(y)
        pop_map = []
        distances = []
        width_x = 0.5*(max(widths_x) + min(widths_x))
        width_y = 0.5*(max(widths_y) + min(widths_y))
        for x in range(self.MAP_WIDTH):
            for y in range(self.MAP_HEIGHT):
                pop = map[x][y].population
                if pop > 0 and (x,y) not in self.tower:
                    pop_map.append(map[x][y])
                    distances.append(((abs(x - width_x))**2+(abs(y-width_y))**2)**0.5)
        if (obstructed):
            chosen_pop = pop_map[random.randint(0, len(pop_map) - 1)]
        else:
            chosen_pop = pop_map[distances.index(min(distances))]
        
        if len(pop_map) > 0:
            costs = []
            for start in my_structs:
                sx = start.x
                sy = start.y
                ex = chosen_pop.x
                ey = chosen_pop.y
                ox = 1
                oy = 1
                if (sx > ex):
                    ox = -1
                if (sy > ey):
                    ox = -1
                cost0 = 0
                cost1 = 0
                for x in range(sx, ex + ox, ox):
                    cost0 += map[x][y].passability
                    cost1 += map[x][ey].passability
                for y in range(sy, ey+ oy, oy):
                    cost0 += map[ey][y].passability
                    cost1 += map[sy][y].passability
                costs.append(cost0)
                costs.append(cost1)
            start = my_structs[(costs.index(min(costs)))//2]
            stx = start.x
            sty = start.y
            enx = chosen_pop.x
            eny = chosen_pop.y
            print("Chosen", chosen_pop.x, chosen_pop.y, "from ", start.x, start.y)
            ofx = 1
            ofy = 1
            if (stx > enx):
                ofx = -1
            if (sty > eny):
                ofy = -1
            self.road = []
            if (costs.index(min(costs)))%2 == 1: 
                for x in range(stx, enx + ofx, ofx):
                    self.road.append(map[x][sty])
                    print("Road", x, sty)
                for y in range(sty, eny + ofy, ofy):
                    self.road.append(map[enx][y])
                    print("Road", enx, y)
            else:
                for y in range(sty, eny + ofy, ofy):
                    self.road.append(map[stx][y])
                    print("Rpad",stx, y )
                for x in range(stx, enx + ofx, ofx):
                    self.road.append(map[x][eny])
                    print("Road",x, eny)
        return
    
    def build_something(self, map, player_info):
        print("Tiles", len(self.road))
        roadTile = self.road.pop(0)
        if (roadTile.structure != None): 
            if (roadTile.structure.team != player_info.team):
                print("Obstruction\n")
                self.find_road(map, player_info, True) # If obstructed by enemy structure
                return
            else:
                if (len(self.road) > 0):
                    roadTile = self.road.pop(0)
            # Otherwise ignore structure
        print("BUILDING ON", roadTile.x, roadTile.y, "Len", len(self.road))
        if len(self.road) == 0:
            self.build(StructureType.TOWER, roadTile.x, roadTile.y)
            # Remove tower-served population from population to-do list
            for item in self.towerServed:
                x = item[0]
                y = item[1]
                if (x+roadTile.x >= 0 and x+roadTile.x < self.MAP_WIDTH and y+roadTile.y >= 0 and y+roadTile.y < self.MAP_HEIGHT):
                    testTile = map[x+roadTile.x][y+roadTile.y]
                    if testTile.population > 0:
                        self.tower.append((x+roadTile.x, y+roadTile.y))
            self.road = []
            return
        else:
            self.build(StructureType.ROAD, roadTile.x, roadTile.y)
            return

    def play_turn(self, turn_num, map, player_info):
        # randomly bid 1 or 2
        self.set_bid(random.randint(1, 2))
        if len(self.road) == 0:
            self.find_road(map, player_info, False)
        if len(self.road) != 0:
            self.build_something(map, player_info)
        return
    
    

