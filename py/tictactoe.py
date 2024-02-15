import random, time, os

def c(): os.system('cls' if os.name == 'nt' else 'clear')

COORDS = [
    ['a', 'b', 'c'],
    ['1', '2', '3']
]

c()
gamemode = input('\nWelcome to the Tic Tac Toe game!\n\
    \rPlay with bot / 2P Game (1/2)? ')

gamemode = '2p' if gamemode == '2' else 'bot' 

boardBlank = ' '
board = [boardBlank] * 9

ROLES = ['×', 'o']
p1 = ''
p2 = ''

if gamemode == '2p':
    p1 = ROLES[0]
    p2 = ROLES[1]

crrPlayer = random.choice(['x', 'o'])
if crrPlayer == 'x':
    crrPlayer = ROLES[0]
    botPlayer = ROLES[1]
else:
    crrPlayer = ROLES[1]
    botPlayer = ROLES[0]
    
gameRunning = True

def printBoard(board):    
    c()
    print(f'\n_|_______________|_\n\
            \r |               |\n\
            \ra|   {board[0]} | {board[1]} | {board[2]}   |\n\
            \r-|  ---|---|---  |\n\
            \rb|   {board[3]} | {board[4]} | {board[5]}   |\n\
            \r-|  ---|---|---  |\n\
            \rc|   {board[6]} | {board[7]} | {board[8]}   |\n\
            \r_|_______________|_\n\
            \r |   1 | 2 | 3   |\n')
    

def playerInp(board, player):
    coords = input('Enter coordinates (e.g. a2, c3): ')
 
    while not coords or coords[0] not in COORDS[0] or coords[1] not in COORDS[1]:
        print('Please enter a letter (a, b, c) followed by a number (1, 2, 3).')
        coords = input('Enter coordinates: ')
    
    row, col = coords[0], coords[1]
    rowIndex = ord(row) - ord('a')
    colIndex = int(col) - 1
    index = rowIndex * 3 + colIndex
    
    while not board[index] == boardBlank:
        coords = input('Cell already occupied. Choose a different move.\n\n\
            \rEnter coordinates: ')
        
        while not coords or coords[0] not in COORDS[0] or coords[1] not in COORDS[1]:
            print('Please enter a letter (a, b, c) followed by a number (1, 2, 3).')
            coords = input('Enter coordinates: ')
    
        row, col = coords[0], coords[1]
        rowIndex = ord(row) - ord('a')
        colIndex = int(col) - 1
        index = rowIndex * 3 + colIndex

    board[index] = player
    printBoard(board)

def botMove(board, player):
    coords = f'{random.choice(COORDS[0])}{random.choice(COORDS[1])}'
    row, col = coords[0], coords[1]
    rowIndex = ord(row) - ord('a')
    colIndex = int(col) - 1
    index = rowIndex * 3 + colIndex
    
    while not board[index] == boardBlank:
        coords = f'{random.choice(COORDS[0])}{random.choice(COORDS[1])}'
        row, col = coords[0], coords[1]
        rowIndex = ord(row) - ord('a')
        colIndex = int(col) - 1
        index = rowIndex * 3 + colIndex
    
    board[index] = player
    printBoard(board)

def checkWin(board):        
    def displayWinner(player):
        global gameRunning
        gameRunning = False
        if player == ROLES[0]:
            print('Player X won!')
        elif player == ROLES[1]:
            print('Player O won!')
        else:
            print("It's a tie!")
        
    
    if ((board[0] == board[1] == board[2] and board[0] != boardBlank) or
        (board[0] == board[3] == board[6] and board[0] != boardBlank) or
        (board[0] == board[4] == board[8] and board[0] != boardBlank)
        ):
        displayWinner(board[0])
    elif (
        (board[3] == board[4] == board[5] and board[3] != boardBlank) or
        (board[1] == board[4] == board[7] and board[1] != boardBlank) or
        (board[2] == board[4] == board[6] and board[2] != boardBlank)
        ):
        displayWinner(board[4])
    elif (
        (board[6] == board[7] == board[8] and board[6] != boardBlank) or
        (board[2] == board[5] == board[8] and board[2] != boardBlank)  
        ):
        displayWinner(board[8])
    elif boardBlank not in board:
        displayWinner(False)
    
        
turn = 0
while gameRunning:    
    checkWin(board)    
    if gamemode == 'bot':
        if crrPlayer == ROLES[0]:
            printBoard(board)
            checkWin(board)     
            playerInp(board, crrPlayer)
            checkWin(board)
            time.sleep(1)
            botMove(board, botPlayer)
        else:
            printBoard(board)
            checkWin(board)
            time.sleep(1)
            botMove(board, botPlayer)
            checkWin(board)
            playerInp(board, crrPlayer)

    else:
        printBoard(board)
        turn += 1
        if turn % 2 != 0:
            playerInp(board, p1)
            turn = 1
        else:
            playerInp(board, p2)
            turn = 0
            
    checkWin(board)


    