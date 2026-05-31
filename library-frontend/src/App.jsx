import { useEffect, useState } from 'react'

const API_URL = 'https://localhost:7174/api'

function App() {
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])
    const [loans, setLoans] = useState([])

    const [username, setUsername] = useState('admin')
    const [password, setPassword] = useState('admin123')
    const [token, setToken] = useState('')
    const [role, setRole] = useState('')
    const [message, setMessage] = useState('')

    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        year: '',
        genre: '',
        categoryId: 1,
        isAvailable: true
    })

    const [editingBook, setEditingBook] = useState(null)

    useEffect(() => {
        loadBooks()
        loadCategories()
    }, [])

    async function loadBooks() {
        const response = await fetch(`${API_URL}/books`)
        const data = await response.json()
        setBooks(data)
    }

    async function loadCategories() {
        const response = await fetch(`${API_URL}/categories`)
        const data = await response.json()
        setCategories(data)
    }

    async function login() {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        if (!response.ok) {
            setMessage('Fel anvandarnamn eller losenord')
            return
        }

        const data = await response.json()
        setToken(data.token)
        setRole(data.role)
        setMessage(`Inloggad som ${data.username} (${data.role})`)
    }

    async function addBook() {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                ...newBook,
                year: Number(newBook.year),
                categoryId: Number(newBook.categoryId)
            })
        })

        if (!response.ok) {
            setMessage('Du maste vara admin for att lagga till bok')
            return
        }

        setNewBook({
            title: '',
            author: '',
            year: '',
            genre: '',
            categoryId: 1,
            isAvailable: true
        })

        setMessage('Bok tillagd')
        loadBooks()
    }

    function startEdit(book) {
        setEditingBook({
            id: book.id,
            title: book.title,
            author: book.author,
            year: book.year,
            genre: book.genre,
            categoryId: book.categoryId,
            isAvailable: book.isAvailable
        })
    }

    async function updateBook() {
        const response = await fetch(`${API_URL}/books/${editingBook.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                id: editingBook.id,
                title: editingBook.title,
                author: editingBook.author,
                year: Number(editingBook.year),
                genre: editingBook.genre,
                categoryId: Number(editingBook.categoryId),
                isAvailable: editingBook.isAvailable
            })
        })

        if (!response.ok) {
            setMessage('Du maste vara admin for att andra bok')
            return
        }

        setEditingBook(null)
        setMessage('Bok andrad')
        loadBooks()
    }

    async function deleteBook(id) {
        const response = await fetch(`${API_URL}/books/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            setMessage('Du maste vara admin for att ta bort bok')
            return
        }

        setMessage('Bok borttagen')
        loadBooks()
    }

    async function borrowBook(bookId) {
        const response = await fetch(`${API_URL}/loans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                bookId: bookId,
                borrowerName: username
            })
        })

        if (!response.ok) {
            setMessage('Du maste vara inloggad och boken maste vara tillganglig')
            return
        }

        setMessage('Bok lanad')
        loadBooks()
        loadLoans()
    }

    async function loadLoans() {
        const response = await fetch(`${API_URL}/loans`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            setMessage('Logga in for att se lan')
            return
        }

        const data = await response.json()
        setLoans(data)
    }

    async function returnBook(id) {
        const response = await fetch(`${API_URL}/loans/${id}/return`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            setMessage('Kunde inte lamna tillbaka boken')
            return
        }

        setMessage('Bok aterlamnad')
        loadBooks()
        loadLoans()
    }

    return (
        <div style={{ fontFamily: 'Arial', padding: '30px', maxWidth: '1000px', margin: 'auto' }}>
            <h1>Bibliotekssystem</h1>
            <p>Fullstack-projekt med React, ASP.NET Core Web API, Entity Framework och JWT-login.</p>

            <hr />

            <h2>Logga in</h2>
            <input
                placeholder="Anvandarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                placeholder="Losenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginLeft: '10px' }}
            />

            <button onClick={login} style={{ marginLeft: '10px' }}>
                Logga in
            </button>

            <p><b>{message}</b></p>

            <hr />

            <h2>Bocker</h2>

            {books.map(book => (
                <div key={book.id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
                    <h3>{book.title}</h3>
                    <p>Forfattare: {book.author}</p>
                    <p>Ar: {book.year}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Status: {book.isAvailable ? 'Tillganglig' : 'Utlanad'}</p>

                    <button onClick={() => borrowBook(book.id)}>
                        Lana bok
                    </button>

                    {role === 'Admin' && (
                        <>
                            <button onClick={() => startEdit(book)} style={{ marginLeft: '10px' }}>
                                Andra
                            </button>

                            <button onClick={() => deleteBook(book.id)} style={{ marginLeft: '10px' }}>
                                Ta bort
                            </button>
                        </>
                    )}
                </div>
            ))}

            {role === 'Admin' && editingBook && (
                <>
                    <hr />

                    <h2>Andra bok (Admin)</h2>

                    <input
                        placeholder="Titel"
                        value={editingBook.title}
                        onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    />

                    <input
                        placeholder="Forfattare"
                        value={editingBook.author}
                        onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    />

                    <input
                        placeholder="Ar"
                        value={editingBook.year}
                        onChange={(e) => setEditingBook({ ...editingBook, year: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    />

                    <input
                        placeholder="Genre"
                        value={editingBook.genre}
                        onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    />

                    <select
                        value={editingBook.categoryId}
                        onChange={(e) => setEditingBook({ ...editingBook, categoryId: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={updateBook} style={{ marginLeft: '10px' }}>
                        Spara andring
                    </button>

                    <button onClick={() => setEditingBook(null)} style={{ marginLeft: '10px' }}>
                        Avbryt
                    </button>
                </>
            )}

            <hr />

            {role === 'Admin' && (
                <>
                    <h2>Lagg till bok (Admin)</h2>

                    <input
                        placeholder="Titel"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />

                    <input
                        placeholder="Forfattare"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    />

                    <input
                        placeholder="Ar"
                        value={newBook.year}
                        onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    />

                    <input
                        placeholder="Genre"
                        value={newBook.genre}
                        onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    />

                    <select
                        value={newBook.categoryId}
                        onChange={(e) => setNewBook({ ...newBook, categoryId: e.target.value })}
                        style={{ marginLeft: '10px' }}
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={addBook} style={{ marginLeft: '10px' }}>
                        Lagg till
                    </button>
                </>
            )}

            <hr />

            <h2>Kategorier</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>

            <hr />

            <h2>Lan</h2>

            <button onClick={loadLoans}>
                Visa lan
            </button>

            {loans.map(loan => (
                <div key={loan.id} style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
                    <p>Bok: {loan.book?.title}</p>
                    <p>Lantagare: {loan.borrowerName}</p>
                    <p>Lanedatum: {loan.loanDate}</p>
                    <p>Returnerad: {loan.returnDate ? loan.returnDate : 'Nej'}</p>

                    {!loan.returnDate && (
                        <button onClick={() => returnBook(loan.id)}>
                            Lamna tillbaka
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default App 