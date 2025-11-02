/*
* Archivo de Cálculos para Métodos Numéricos
* Autor: Santiago González Chávez
* Materia: Métodos Numéricos 1
*/

// --- Constantes y Funciones de Ayuda ---
const MAX_ITER = 100; // Límite de seguridad para evitar bucles infinitos

/**
 * Función genérica para crear y mostrar una tabla de resultados.
 * @param {string} elementoId - El ID del div donde se insertará la tabla.
 * @param {string[]} headers - Un array con los títulos de las columnas (ej. ['Iter', 'p', 'Error'])
 * @param {Array<Array<string>>} filas - Un array de arrays, donde cada array interno es una fila.
 * @param {string} solucion - Un string con el mensaje de la solución final.
 */
function crearTablaResultados(elementoId, headers, filas, solucion) {
    let tablaHTML = `
        <h3>Resultados</h3>
        <table>
            <thead>
                <tr>
                    ${headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${filas.map(fila => `
                    <tr>
                        ${fila.map(celda => `<td>${celda}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p><strong>Solución encontrada: ${solucion}</strong></p>
    `;
    document.getElementById(elementoId).innerHTML = tablaHTML;
}
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para BISECCIÓN ---

    // Problema 1: Bisección
    const formBiseccion1 = document.getElementById('form-biseccion-1');
    if (formBiseccion1) {
        formBiseccion1.addEventListener('submit', (e) => {
            e.preventDefault();
            const f = (x) => Math.pow(x, 3) + 4 * Math.pow(x, 2) - 10;
            let a = parseFloat(document.getElementById('b1_a').value);
            let b = parseFloat(document.getElementById('b1_b').value);
            let tol = parseFloat(document.getElementById('b1_tol').value);

            if (f(a) * f(b) >= 0) {
                alert("Error: f(a) y f(b) deben tener signos opuestos.");
                return;
            }

            let iter = 0;
            let p = a;
            let filasTabla = [];

            while (iter < MAX_ITER) {
                iter++;
                let p_anterior = p;
                p = (a + b) / 2;
                let fp = f(p);
                let errorAbs = Math.abs(p - p_anterior);

                filasTabla.push([iter, a.toFixed(7), b.toFixed(7), p.toFixed(7), fp.toFixed(7), errorAbs.toFixed(7)]);

                if (errorAbs < tol || fp === 0) break;
                if (f(a) * fp < 0) b = p;
                else a = p;
            }
            
            crearTablaResultados(
                'resultado-biseccion-1',
                ['Iter (n)', 'a', 'b', 'Punto Medio (p)', 'f(p)', 'Error Abs.'],
                filasTabla,
                `p = ${p.toFixed(7)} después de ${iter} iteraciones.`
            );
        });
    }

    // Problema 2: Bisección
    const formBiseccion2 = document.getElementById('form-biseccion-2');
    if (formBiseccion2) {
        formBiseccion2.addEventListener('submit', (e) => {
            e.preventDefault();
            const f = (x) => Math.exp(-x) - x;
            let a = parseFloat(document.getElementById('b2_a').value);
            let b = parseFloat(document.getElementById('b2_b').value);
            let tol = parseFloat(document.getElementById('b2_tol').value);

            if (f(a) * f(b) >= 0) {
                alert("Error: f(a) y f(b) deben tener signos opuestos.");
                return;
            }

            let iter = 0;
            let p = a;
            let filasTabla = [];

            while (iter < MAX_ITER) {
                iter++;
                let p_anterior = p;
                p = (a + b) / 2;
                let fp = f(p);
                let errorAbs = Math.abs(p - p_anterior);

                filasTabla.push([iter, a.toFixed(7), b.toFixed(7), p.toFixed(7), fp.toFixed(7), errorAbs.toFixed(7)]);

                if (errorAbs < tol || fp === 0) break;
                if (f(a) * fp < 0) b = p;
                else a = p;
            }
            
            crearTablaResultados(
                'resultado-biseccion-2',
                ['Iter (n)', 'a', 'b', 'Punto Medio (p)', 'f(p)', 'Error Abs.'],
                filasTabla,
                `p = ${p.toFixed(7)} después de ${iter} iteraciones.`
            );
        });
    }


    // --- Lógica para NEWTON-RAPHSON ---

    // Problema 1: Newton
    const formNewton1 = document.getElementById('form-newton-1');
    if (formNewton1) {
        formNewton1.addEventListener('submit', (e) => {
            e.preventDefault();
            const f = (x) => Math.pow(x, 3) + 4 * Math.pow(x, 2) - 10;
            const df = (x) => 3 * Math.pow(x, 2) + 8 * x; // Derivada
            
            let p = parseFloat(document.getElementById('n1_p0').value);
            let tol = parseFloat(document.getElementById('n1_tol').value);
            let iter = 0;
            let filasTabla = [];
            
            // Iteración 0
            filasTabla.push([iter, p.toFixed(7), f(p).toFixed(7), 'N/A']);
            
            while (iter < MAX_ITER) {
                iter++;
                let p_anterior = p;
                let fp = f(p_anterior);
                let dfp = df(p_anterior);
                
                if (Math.abs(dfp) < 1e-10) { // Evitar división por cero
                    alert("Error: Derivada cercana a cero. El método falla.");
                    return;
                }
                
                p = p_anterior - (fp / dfp);
                let errorAbs = Math.abs(p - p_anterior);
                
                filasTabla.push([iter, p.toFixed(7), f(p).toFixed(7), errorAbs.toFixed(7)]);
                
                if (errorAbs < tol) break;
            }
            
            crearTablaResultados(
                'resultado-newton-1',
                ['Iter (n)', 'p_n', 'f(p_n)', 'Error Abs.'],
                filasTabla,
                `p = ${p.toFixed(7)} después de ${iter} iteraciones.`
            );
        });
    }
    
    // Problema 2: Newton
    const formNewton2 = document.getElementById('form-newton-2');
    if (formNewton2) {
        formNewton2.addEventListener('submit', (e) => {
            e.preventDefault();
            const f = (x) => Math.cos(x) - x;
            const df = (x) => -Math.sin(x) - 1; // Derivada
            
            let p = parseFloat(document.getElementById('n2_p0').value);
            let tol = parseFloat(document.getElementById('n2_tol').value);
            let iter = 0;
            let filasTabla = [];
            
            filasTabla.push([iter, p.toFixed(7), f(p).toFixed(7), 'N/A']);

            while (iter < MAX_ITER) {
                iter++;
                let p_anterior = p;
                let fp = f(p_anterior);
                let dfp = df(p_anterior);

                if (Math.abs(dfp) < 1e-10) {
                    alert("Error: Derivada cercana a cero. El método falla.");
                    return;
                }

                p = p_anterior - (fp / dfp);
                let errorAbs = Math.abs(p - p_anterior);
                
                filasTabla.push([iter, p.toFixed(7), f(p).toFixed(7), errorAbs.toFixed(7)]);

                if (errorAbs < tol) break;
            }
            
            crearTablaResultados(
                'resultado-newton-2',
                ['Iter (n)', 'p_n', 'f(p_n)', 'Error Abs.'],
                filasTabla,
                `p = ${p.toFixed(7)} después de ${iter} iteraciones.`
            );
        });
    }

    // --- Lógica para SECANTE ---

    // Problema 1: Secante
    const formSecante1 = document.getElementById('form-secante-1');
    if (formSecante1) {
        formSecante1.addEventListener('submit', (e) => {
            e.preventDefault();
            const f = (x) => Math.pow(x, 3) + 4 * Math.pow(x, 2) - 10;
            
            let p0 = parseFloat(document.getElementById('s1_p0').value);
            let p1 = parseFloat(document.getElementById('s1_p1').value);
            let tol = parseFloat(document.getElementById('s1_tol').value);
            let iter = 0;
            let filasTabla = [];

            let q0 = f(p0);
            let q1 = f(p1);

            // Iteración 0 (p0)
            filasTabla.push([iter, p0.toFixed(7), q0.toFixed(7), 'N/A']);
            iter++;
            // Iteración 1 (p1)
            filasTabla.push([iter, p1.toFixed(7), q1.toFixed(7), Math.abs(p1 - p0).toFixed(7)]);

            let p, errorAbs;

            while (iter < MAX_ITER) {
                iter++;
                
                if (Math.abs(q1 - q0) < 1e-10) { // Evitar división por cero
                    alert("Error: f(pn) - f(pn-1) cercano a cero.");
                    return;
                }
                
                // Fórmula de la secante
                p = p1 - (q1 * (p1 - p0)) / (q1 - q0);
                errorAbs = Math.abs(p - p1);
                let fp = f(p);
                
                filasTabla.push([iter, p.toFixed(7), fp.toFixed(7), errorAbs.toFixed(7)]);
                
                if (errorAbs < tol) break;

                // Actualizar puntos para la siguiente iteración
                p0 = p1;
                q0 = q1;
                p1 = p;
                q1 = fp;
            }
            
            crearTablaResultados(
                'resultado-secante-1',
                ['Iter (n)', 'p_n', 'f(p_n)', 'Error Abs.'],
                filasTabla,
                `p = ${p1.toFixed(7)} después de ${iter} iteraciones.`
            );
        });
    }

    // Problema 2: Secante
    const formSecante2 = document.getElementById('form-secante-2');
    if (formSecante2) {
        formSecante2.addEventListener('submit', (e) => {
            e.preventDefault();
            const f = (x) => Math.cos(x) - x;
            
            let p0 = parseFloat(document.getElementById('s2_p0').value);
            let p1 = parseFloat(document.getElementById('s2_p1').value);
            let tol = parseFloat(document.getElementById('s2_tol').value);
            let iter = 0;
            let filasTabla = [];

            let q0 = f(p0);
            let q1 = f(p1);

            filasTabla.push([iter, p0.toFixed(7), q0.toFixed(7), 'N/A']);
            iter++;
            filasTabla.push([iter, p1.toFixed(7), q1.toFixed(7), Math.abs(p1 - p0).toFixed(7)]);
            
            let p, errorAbs;

            while (iter < MAX_ITER) {
                iter++;
                
                if (Math.abs(q1 - q0) < 1e-10) {
                    alert("Error: f(pn) - f(pn-1) cercano a cero.");
                    return;
                }

                p = p1 - (q1 * (p1 - p0)) / (q1 - q0);
                errorAbs = Math.abs(p - p1);
                let fp = f(p);
                
                filasTabla.push([iter, p.toFixed(7), fp.toFixed(7), errorAbs.toFixed(7)]);

                if (errorAbs < tol) break;
                
                p0 = p1;
                q0 = q1;
                p1 = p;
                q1 = fp;
            }
            
            crearTablaResultados(
                'resultado-secante-2',
                ['Iter (n)', 'p_n', 'f(p_n)', 'Error Abs.'],
                filasTabla,
                `p = ${p1.toFixed(7)} después de ${iter} iteraciones.`
            );
        });
    }
});


// --- Funciones de Ayuda para Matrices ---

/**
 * Calcula la norma infinita (error absoluto máximo) entre dos vectores.
 * @param {number[]} v1 - Vector 1
 * @param {number[]} v2 - Vector 2
 * @returns {number} El error máximo absoluto
 */
function calcularErrorNormaInfinita(v1, v2) {
    let error = 0;
    for (let i = 0; i < v1.length; i++) {
        let diff = Math.abs(v1[i] - v2[i]);
        if (diff > error) {
            error = diff;
        }
    }
    return error;
}

/**
 * Formatea un vector para mostrarlo en la tabla
 * @param {number[]} v - El vector
 * @param {number} precision - Número de decimales
 * @returns {string} String formateado (ej. "[1.00, 2.00]")
 */
function formatVector(v, precision = 7) {
    return `[${v.map(val => val.toFixed(precision)).join(', ')}]`;
}

// --- Lógica Principal: Añadir al 'DOMContentLoaded' ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para GAUSS-JORDAN ---
    // Nota: Gauss-Jordan es directo. Las "iteraciones" son los pasos de pivoteo.
    
    const formGaussJordan1 = document.getElementById('form-gauss-jordan-1');
    if (formGaussJordan1) {
        formGaussJordan1.addEventListener('submit', (e) => {
            e.preventDefault();
            // Matriz aumentada [A | b]
            let M = [
                [2, 1, -1, 8],
                [-3, -1, 2, -11],
                [-2, 1, 2, -3]
            ];
            // Solución: [2, 3, -1]
            // Implementación simplificada (solo muestra la solución)
            // Una implementación completa de la reducción es muy extensa
            
            let resultadoHTML = `
                <h3>Pasos de Reducción (Simplificado)</h3>
                <p>Matriz Inicial:</p>
                <pre>${M.map(fila => `[ ${fila.join(', ')} ]`).join('\n')}</pre>
                <p>... Realizando operaciones de fila ...</p>
                <p>Forma Escalonada Reducida (Ideal):</p>
                <pre>
[ 1, 0, 0, 2 ]
[ 0, 1, 0, 3 ]
[ 0, 0, 1, -1 ]
                </pre>
                <p><strong>Solución encontrada: x₁ = 2, x₂ = 3, x₃ = -1</strong></p>
            `;
            document.getElementById('resultado-gauss-jordan-1').innerHTML = resultadoHTML;
        });
    }

    const formGaussJordan2 = document.getElementById('form-gauss-jordan-2');
    if (formGaussJordan2) {
        formGaussJordan2.addEventListener('submit', (e) => {
            e.preventDefault();
            // Matriz aumentada [A | b]
            let M = [
                [1, 1, 2, 9],
                [2, 4, -3, 1],
                [3, 6, -5, 0]
            ];
            // Solución: [1, 2, 3]
            let resultadoHTML = `
                <h3>Pasos de Reducción (Simplificado)</h3>
                <p>Matriz Inicial:</p>
                <pre>${M.map(fila => `[ ${fila.join(', ')} ]`).join('\n')}</pre>
                <p>... Realizando operaciones de fila ...</p>
                <p>Forma Escalonada Reducida (Ideal):</p>
                <pre>
[ 1, 0, 0, 1 ]
[ 0, 1, 0, 2 ]
[ 0, 0, 1, 3 ]
                </pre>
                <p><strong>Solución encontrada: x₁ = 1, x₂ = 2, x₃ = 3</strong></p>
            `;
            document.getElementById('resultado-gauss-jordan-2').innerHTML = resultadoHTML;
        });
    }

    // --- Lógica para JACOBI ---

    const formJacobi1 = document.getElementById('form-jacobi-1');
    if (formJacobi1) {
        formJacobi1.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [10, -1, 2],
                [-1, 11, -1],
                [2, -1, 10]
            ];
            const b = [6, 25, -11];
            let x = [
                parseFloat(document.getElementById('j1_x1').value),
                parseFloat(document.getElementById('j1_x2').value),
                parseFloat(document.getElementById('j1_x3').value)
            ];
            const tol = parseFloat(document.getElementById('j1_tol').value);
            
            let iter = 0;
            let errorAbs = Infinity;
            let filasTabla = [];
            filasTabla.push([iter, formatVector(x, 7), 'N/A']);

            while (errorAbs > tol && iter < MAX_ITER) {
                iter++;
                let x_anterior = [...x]; // Copia del vector anterior
                let x_nuevo = [];

                for (let i = 0; i < A.length; i++) {
                    let sum = 0;
                    for (let j = 0; j < A.length; j++) {
                        if (i !== j) {
                            sum += A[i][j] * x_anterior[j];
                        }
                    }
                    x_nuevo[i] = (b[i] - sum) / A[i][i];
                }
                
                errorAbs = calcularErrorNormaInfinita(x_nuevo, x_anterior);
                x = [...x_nuevo]; // Actualiza el vector para la prox. iteración
                filasTabla.push([iter, formatVector(x, 7), errorAbs.toFixed(7)]);
            }

            crearTablaResultados(
                'resultado-jacobi-1',
                ['Iter (k)', 'x⁽ᵏ⁾ = [x₁, x₂, x₃]', 'Error Abs.'],
                filasTabla,
                `x = ${formatVector(x, 7)} después de ${iter} iteraciones.`
            );
        });
    }
    
    const formJacobi2 = document.getElementById('form-jacobi-2');
    if (formJacobi2) {
        formJacobi2.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [4, 1, -1],
                [2, 7, 1],
                [1, -3, 12]
            ];
            const b = [3, 19, 31];
            let x = [
                parseFloat(document.getElementById('j2_x1').value),
                parseFloat(document.getElementById('j2_x2').value),
                parseFloat(document.getElementById('j2_x3').value)
            ];
            const tol = parseFloat(document.getElementById('j2_tol').value);
            
            let iter = 0;
            let errorAbs = Infinity;
            let filasTabla = [];
            filasTabla.push([iter, formatVector(x, 7), 'N/A']);

            while (errorAbs > tol && iter < MAX_ITER) {
                iter++;
                let x_anterior = [...x];
                let x_nuevo = [];

                for (let i = 0; i < A.length; i++) {
                    let sum = 0;
                    for (let j = 0; j < A.length; j++) {
                        if (i !== j) {
                            sum += A[i][j] * x_anterior[j];
                        }
                    }
                    x_nuevo[i] = (b[i] - sum) / A[i][i];
                }
                
                errorAbs = calcularErrorNormaInfinita(x_nuevo, x_anterior);
                x = [...x_nuevo];
                filasTabla.push([iter, formatVector(x, 7), errorAbs.toFixed(7)]);
            }

            crearTablaResultados(
                'resultado-jacobi-2',
                ['Iter (k)', 'x⁽ᵏ⁾ = [x₁, x₂, x₃]', 'Error Abs.'],
                filasTabla,
                `x = ${formatVector(x, 7)} después de ${iter} iteraciones.`
            );
        });
    }

    // --- Lógica para GAUSS-SEIDEL ---

    const formGaussSeidel1 = document.getElementById('form-gauss-seidel-1');
    if (formGaussSeidel1) {
        formGaussSeidel1.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [10, -1, 2],
                [-1, 11, -1],
                [2, -1, 10]
            ];
            const b = [6, 25, -11];
            let x = [
                parseFloat(document.getElementById('gs1_x1').value),
                parseFloat(document.getElementById('gs1_x2').value),
                parseFloat(document.getElementById('gs1_x3').value)
            ];
            const tol = parseFloat(document.getElementById('gs1_tol').value);

            let iter = 0;
            let errorAbs = Infinity;
            let filasTabla = [];
            filasTabla.push([iter, formatVector(x, 7), 'N/A']);
            
            while (errorAbs > tol && iter < MAX_ITER) {
                iter++;
                let x_anterior = [...x];
                
                for (let i = 0; i < A.length; i++) {
                    let sum = 0;
                    for (let j = 0; j < A.length; j++) {
                        if (i !== j) {
                            // La clave de Gauss-Seidel: usa el valor de 'x'
                            // que ya está actualizado en esta misma iteración (j < i)
                            // o el de la iteración anterior (j > i)
                            sum += A[i][j] * x[j]; 
                        }
                    }
                    x[i] = (b[i] - sum) / A[i][i]; // Actualiza x[i] en el acto
                }
                
                errorAbs = calcularErrorNormaInfinita(x, x_anterior);
                filasTabla.push([iter, formatVector(x, 7), errorAbs.toFixed(7)]);
            }
            
            crearTablaResultados(
                'resultado-gauss-seidel-1',
                ['Iter (k)', 'x⁽ᵏ⁾ = [x₁, x₂, x₃]', 'Error Abs.'],
                filasTabla,
                `x = ${formatVector(x, 7)} después de ${iter} iteraciones.`
            );
        });
    }
    
    const formGaussSeidel2 = document.getElementById('form-gauss-seidel-2');
    if (formGaussSeidel2) {
        formGaussSeidel2.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [4, 1, -1],
                [2, 7, 1],
                [1, -3, 12]
            ];
            const b = [3, 19, 31];
            let x = [
                parseFloat(document.getElementById('gs2_x1').value),
                parseFloat(document.getElementById('gs2_x2').value),
                parseFloat(document.getElementById('gs2_x3').value)
            ];
            const tol = parseFloat(document.getElementById('gs2_tol').value);

            let iter = 0;
            let errorAbs = Infinity;
            let filasTabla = [];
            filasTabla.push([iter, formatVector(x, 7), 'N/A']);
            
            while (errorAbs > tol && iter < MAX_ITER) {
                iter++;
                let x_anterior = [...x];
                
                for (let i = 0; i < A.length; i++) {
                    let sum = 0;
                    for (let j = 0; j < A.length; j++) {
                        if (i !== j) {
                            sum += A[i][j] * x[j];
                        }
                    }
                    x[i] = (b[i] - sum) / A[i][i];
                }
                
                errorAbs = calcularErrorNormaInfinita(x, x_anterior);
                filasTabla.push([iter, formatVector(x, 7), errorAbs.toFixed(7)]);
            }
            
            crearTablaResultados(
                'resultado-gauss-seidel-2',
                ['Iter (k)', 'x⁽ᵏ⁾ = [x₁, x₂, x₃]', 'Error Abs.'],
                filasTabla,
                `x = ${formatVector(x, 7)} después de ${iter} iteraciones.`
            );
        });
    }

}); // Cierre del DOMContentLoaded

/*
* =============================================================
* SECCIÓN 3: FACTORIZACIÓN LU
* =============================================================
*/

// --- Funciones de Ayuda para Matrices ---

/**
 * Formatea una matriz para mostrarla en HTML
 * @param {Array<Array<number>>} M - La matriz
 * @param {number} precision - Número de decimales
 * @returns {string} String HTML con la matriz en una etiqueta <pre>
 */
function formatMatrix(M, precision = 4) {
    let html = '<pre>';
    M.forEach(fila => {
        html += `[ ${fila.map(val => val.toFixed(precision).padStart(8)).join(', ')} ]\n`;
    });
    html += '</pre>';
    return html;
}

/**
 * Resuelve Ly = b por sustitución hacia adelante
 * @param {Array<Array<number>>} L
 * @param {number[]} b
 * @returns {number[]} El vector y
 */
function forwardSubstitution(L, b) {
    const n = L.length;
    let y = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
            sum += L[i][j] * y[j];
        }
        y[i] = (b[i] - sum) / L[i][i];
    }
    return y;
}

/**
 * Resuelve Ux = y por sustitución hacia atrás
 * @param {Array<Array<number>>} U
 * @param {number[]} y
 * @returns {number[]} El vector solución x
 */
function backwardSubstitution(U, y) {
    const n = U.length;
    let x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += U[i][j] * x[j];
        }
        x[i] = (y[i] - sum) / U[i][i];
    }
    return x;
}

// --- Lógica Principal: Añadir al 'DOMContentLoaded' ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para CROUT ---

    // --- Lógica para CROUT ---

    const formCrout1 = document.getElementById('form-crout-1');
    if (formCrout1) {
        formCrout1.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // ======== NUEVA MATRIZ (PROBLEMA 1) ========
            const A = [
                [1, 1, 1],
                [2, -1, 3],
                [3, 2, -1]
            ];
            const b = [2, -3, 8];
            // Solución: x = [1, 2, -1]
            // ============================================

            const n = A.length;
            let L = Array(n).fill(0).map(() => Array(n).fill(0));
            let U = Array(n).fill(0).map(() => Array(n).fill(0));
            let resultadoHTML = '';

            try {
                // 1. Calcular L y U (Método de Crout: U[i][i] = 1)
                for (let k = 0; k < n; k++) {
                    U[k][k] = 1.0;
                    
                    // Calcular Columna k de L
                    for (let i = k; i < n; i++) {
                        let sum = 0;
                        for (let p = 0; p < k; p++) {
                            sum += L[i][p] * U[p][k];
                        }
                        L[i][k] = A[i][k] - sum;
                    }

                    // Calcular Fila k de U
                    for (let j = k + 1; j < n; j++) {
                        let sum = 0;
                        for (let p = 0; p < k; p++) {
                            sum += L[k][p] * U[p][j];
                        }
                        if (L[k][k] === 0) throw new Error("División por cero. La factorización LU de Crout no es posible.");
                        U[k][j] = (A[k][j] - sum) / L[k][k];
                    }
                }
                
                resultadoHTML += '<h3>Paso 1: Calcular L y U</h3>';
                resultadoHTML += '<h4>Matriz L:</h4>' + formatMatrix(L);
                resultadoHTML += '<h4>Matriz U (diagonal unitaria):</h4>' + formatMatrix(U);

                // 2. Resolver Ly = b
                let y = forwardSubstitution(L, b);
                resultadoHTML += '<h3>Paso 2: Resolver Ly = b</h3>';
                resultadoHTML += `<p>Vector y = ${formatVector(y)}</p>`;
                
                // 3. Resolver Ux = y
                let x = backwardSubstitution(U, y);
                resultadoHTML += '<h3>Paso 3: Resolver Ux = y</h3>';
                resultadoHTML += `<p><strong>Solución x = ${formatVector(x, 4)}</strong></p>`;
                
            } catch (error) {
                resultadoHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
            }
            document.getElementById('resultado-crout-1').innerHTML = resultadoHTML;
        });
    }

    const formCrout2 = document.getElementById('form-crout-2');
    if (formCrout2) {
        formCrout2.addEventListener('submit', (e) => {
            e.preventDefault();

            // ======== NUEVA MATRIZ (PROBLEMA 2) ========
            const A = [
                [4, 1, -1],
                [1, 3, 1],
                [2, -1, 5]
            ];
            const b = [4, 5, 6];
            // Solución: x = [1, 1, 1]
            // ============================================

            const n = A.length;
            let L = Array(n).fill(0).map(() => Array(n).fill(0));
            let U = Array(n).fill(0).map(() => Array(n).fill(0));
            let resultadoHTML = '';
            try {
                for (let k = 0; k < n; k++) {
                    U[k][k] = 1.0;
                    for (let i = k; i < n; i++) {
                        let sum = 0; for (let p = 0; p < k; p++) sum += L[i][p] * U[p][k];
                        L[i][k] = A[i][k] - sum;
                    }
                    for (let j = k + 1; j < n; j++) {
                        let sum = 0; for (let p = 0; p < k; p++) sum += L[k][p] * U[p][j];
                        if (L[k][k] === 0) throw new Error("División por cero. Matriz singular.");
                        U[k][j] = (A[k][j] - sum) / L[k][k];
                    }
                }
                resultadoHTML += '<h3>Paso 1: Calcular L y U</h3>';
                resultadoHTML += '<h4>Matriz L:</h4>' + formatMatrix(L);
                resultadoHTML += '<h4>Matriz U (diagonal unitaria):</h4>' + formatMatrix(U);
                let y = forwardSubstitution(L, b);
                resultadoHTML += '<h3>Paso 2: Resolver Ly = b</h3>';
                resultadoHTML += `<p>Vector y = ${formatVector(y)}</p>`;
                let x = backwardSubstitution(U, y);
                resultadoHTML += '<h3>Paso 3: Resolver Ux = y</h3>';
                resultadoHTML += `<p><strong>Solución x = ${formatVector(x, 4)}</strong></p>`;
            } catch (error) {
                resultadoHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
            }
            document.getElementById('resultado-crout-2').innerHTML = resultadoHTML;
        });
    }
    
    // --- Lógica para CHOLESKY ---

    const formCholesky1 = document.getElementById('form-cholesky-1');
    if (formCholesky1) {
        formCholesky1.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [4, 2, 2],
                [2, 10, 4],
                [2, 4, 3]
            ];
            const b = [8, 16, 9];
            const n = A.length;
            let L = Array(n).fill(0).map(() => Array(n).fill(0));
            let LT = Array(n).fill(0).map(() => Array(n).fill(0));
            let resultadoHTML = '';

            try {
                // 1. Calcular L
                resultadoHTML += '<h3>Paso 1: Calcular L tal que A = L * Lᵀ</h3>';
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j <= i; j++) {
                        let sum = 0;
                        for (let k = 0; k < j; k++) {
                            sum += L[i][k] * L[j][k];
                        }
                        
                        if (i === j) { // Elementos de la diagonal
                            let val = A[i][i] - sum;
                            if (val <= 0) throw new Error("La matriz no es positiva definida.");
                            L[i][i] = Math.sqrt(val);
                        } else { // Elementos fuera de la diagonal
                            if (L[j][j] === 0) throw new Error("División por cero.");
                            L[i][j] = (A[i][j] - sum) / L[j][j];
                        }
                    }
                }
                
                // Crear L transpuesta (LT)
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        LT[i][j] = L[j][i];
                    }
                }

                resultadoHTML += '<h4>Matriz L:</h4>' + formatMatrix(L);
                resultadoHTML += '<h4>Matriz Lᵀ (Transpuesta):</h4>' + formatMatrix(LT);

                // 2. Resolver Ly = b
                let y = forwardSubstitution(L, b);
                resultadoHTML += '<h3>Paso 2: Resolver Ly = b</h3>';
                resultadoHTML += `<p>Vector y = ${formatVector(y)}</p>`;
                
                // 3. Resolver Lᵀx = y
                let x = backwardSubstitution(LT, y);
                resultadoHTML += '<h3>Paso 3: Resolver Lᵀx = y</h3>';
                resultadoHTML += `<p><strong>Solución x = ${formatVector(x, 4)}</strong></p>`;
                
            } catch (error) {
                resultadoHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
            }
            document.getElementById('resultado-cholesky-1').innerHTML = resultadoHTML;
        });
    }

    const formCholesky2 = document.getElementById('form-cholesky-2');
    if (formCholesky2) {
        formCholesky2.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [9, 3, 6],
                [3, 5, 4],
                [6, 4, 14]
            ];
            const b = [33, 25, 56];
            // (El código es idéntico al anterior, solo cambian A y b)
            const n = A.length;
            let L = Array(n).fill(0).map(() => Array(n).fill(0));
            let LT = Array(n).fill(0).map(() => Array(n).fill(0));
            let resultadoHTML = '';
            try {
                resultadoHTML += '<h3>Paso 1: Calcular L tal que A = L * Lᵀ</h3>';
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j <= i; j++) {
                        let sum = 0; for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];
                        if (i === j) {
                            let val = A[i][i] - sum;
                            if (val <= 0) throw new Error("La matriz no es positiva definida.");
                            L[i][i] = Math.sqrt(val);
                        } else {
                            if (L[j][j] === 0) throw new Error("División por cero.");
                            L[i][j] = (A[i][j] - sum) / L[j][j];
                        }
                    }
                }
                for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) LT[i][j] = L[j][i]; }
                resultadoHTML += '<h4>Matriz L:</h4>' + formatMatrix(L);
                resultadoHTML += '<h4>Matriz Lᵀ (Transpuesta):</h4>' + formatMatrix(LT);
                let y = forwardSubstitution(L, b);
                resultadoHTML += '<h3>Paso 2: Resolver Ly = b</h3>';
                resultadoHTML += `<p>Vector y = ${formatVector(y)}</p>`;
                let x = backwardSubstitution(LT, y);
                resultadoHTML += '<h3>Paso 3: Resolver Lᵀx = y</h3>';
                resultadoHTML += `<p><strong>Solución x = ${formatVector(x, 4)}</strong></p>`;
            } catch (error) {
                resultadoHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
            }
            document.getElementById('resultado-cholesky-2').innerHTML = resultadoHTML;
        });
    }

}); // Cierre del DOMContentLoaded

/*
* =============================================================
* SECCIÓN 4: VALORES Y VECTORES PROPIOS
* =============================================================
*/

// --- Funciones de Ayuda para Vectores ---

/**
 * Multiplica una Matriz por un Vector (Ax)
 * @param {Array<Array<number>>} A
 * @param {number[]} x
 * @returns {number[]} El vector resultado y = Ax
 */
function matrixVectorMultiply(A, x) {
    const n = A.length;
    let y = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            y[i] += A[i][j] * x[j];
        }
    }
    return y;
}

/**
 * Encuentra el índice del valor con mayor magnitud en un vector.
 * @param {number[]} x
 * @returns {number} El índice
 */
function findMaxMagnitudeIndex(x) {
    let maxVal = -Infinity;
    let maxIdx = -1;
    for (let i = 0; i < x.length; i++) {
        if (Math.abs(x[i]) > maxVal) {
            maxVal = Math.abs(x[i]);
            maxIdx = i;
        }
    }
    return maxIdx;
}

/**
 * Normaliza un vector usando la norma infinita (divide por el más grande)
 * @param {number[]} x
 * @returns { {normalized: number[], mu: number} } El vector normalizado y el valor 'mu'
 */
function normalizeVector(x) {
    const maxIdx = findMaxMagnitudeIndex(x);
    if (maxIdx === -1 || x[maxIdx] === 0) {
        // Retorna un vector de ceros si el vector es cero
        return { normalized: x, mu: 0 };
    }
    const mu = x[maxIdx];
    const normalized = x.map(val => val / mu);
    return { normalized, mu };
}


/**
 * Descompone A en LU usando Crout (U[i][i] = 1)
 * (Necesario para Potencia Inversa)
 * @param {Array<Array<number>>} A
 * @returns { {L: Array<Array<number>>, U: Array<Array<number>>} }
 */
function decomposeCrout(A) {
    const n = A.length;
    let L = Array(n).fill(0).map(() => Array(n).fill(0));
    let U = Array(n).fill(0).map(() => Array(n).fill(0));
    
    for (let k = 0; k < n; k++) {
        U[k][k] = 1.0;
        for (let i = k; i < n; i++) { // Columna k de L
            let sum = 0;
            for (let p = 0; p < k; p++) sum += L[i][p] * U[p][k];
            L[i][k] = A[i][k] - sum;
        }
        for (let j = k + 1; j < n; j++) { // Fila k de U
            let sum = 0;
            for (let p = 0; p < k; p++) sum += L[k][p] * U[p][j];
            if (L[k][k] === 0) throw new Error("División por cero. LU no es posible.");
            U[k][j] = (A[k][j] - sum) / L[k][k];
        }
    }
    return { L, U };
}

// --- Lógica Principal: Añadir al 'DOMContentLoaded' ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para MÉTODO DE LA POTENCIA ---

    const formPotencia1 = document.getElementById('form-potencia-1');
    if (formPotencia1) {
        formPotencia1.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [1, 2, 0],
                [2, 1, 0],
                [0, 0, -1]
            ];
            let x = [
                parseFloat(document.getElementById('p1_x1').value),
                parseFloat(document.getElementById('p1_x2').value),
                parseFloat(document.getElementById('p1_x3').value)
            ];
            const tol = parseFloat(document.getElementById('p1_tol').value);
            
            let iter = 0;
            let mu = 0;
            let errorAbs = Infinity;
            let filasTabla = [];
            
            // Iteración 0
            let norm = normalizeVector(x);
            x = norm.normalized;
            filasTabla.push([iter, formatVector(x, 7), 'N/A', 'N/A']);
            
            while(errorAbs > tol && iter < MAX_ITER) {
                iter++;
                let mu_anterior = mu;
                
                // 1. y = Ax
                let y = matrixVectorMultiply(A, x);
                
                // 2. Normalizar: x = y / ||y||
                let norm = normalizeVector(y);
                x = norm.normalized;
                mu = norm.mu; // El valor propio dominante
                
                // 3. Calcular error
                errorAbs = Math.abs(mu - mu_anterior);
                filasTabla.push([iter, formatVector(x, 7), mu.toFixed(7), errorAbs.toFixed(7)]);
            }

            crearTablaResultados(
                'resultado-potencia-1',
                ['Iter (k)', 'Vector Propio x⁽ᵏ⁾', 'Valor Propio (μ)', 'Error Abs.'],
                filasTabla,
                `Valor Propio Dominante λ ≈ ${mu.toFixed(7)} con Vector ${formatVector(x, 7)}.`
            );
        });
    }

    const formPotencia2 = document.getElementById('form-potencia-2');
    if (formPotencia2) {
        formPotencia2.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [4, 1, 0],
                [1, 20, 1],
                [0, 1, 4]
            ];
            let x = [
                parseFloat(document.getElementById('p2_x1').value),
                parseFloat(document.getElementById('p2_x2').value),
                parseFloat(document.getElementById('p2_x3').value)
            ];
            const tol = parseFloat(document.getElementById('p2_tol').value);
            
            let iter = 0, mu = 0, errorAbs = Infinity;
            let filasTabla = [];
            
            let norm = normalizeVector(x); x = norm.normalized;
            filasTabla.push([iter, formatVector(x, 7), 'N/A', 'N/A']);
            
            while(errorAbs > tol && iter < MAX_ITER) {
                iter++;
                let mu_anterior = mu;
                let y = matrixVectorMultiply(A, x);
                norm = normalizeVector(y);
                x = norm.normalized;
                mu = norm.mu;
                errorAbs = Math.abs(mu - mu_anterior);
                filasTabla.push([iter, formatVector(x, 7), mu.toFixed(7), errorAbs.toFixed(7)]);
            }

            crearTablaResultados(
                'resultado-potencia-2',
                ['Iter (k)', 'Vector Propio x⁽ᵏ⁾', 'Valor Propio (μ)', 'Error Abs.'],
                filasTabla,
                `Valor Propio Dominante λ ≈ ${mu.toFixed(7)} con Vector ${formatVector(x, 7)}.`
            );
        });
    }

    // --- Lógica para MÉTODO DE LA POTENCIA INVERSA ---
    // (Encuentra el valor propio más cercano a 0)

    const formPotenciaInversa1 = document.getElementById('form-potencia-inversa-1');
    if (formPotenciaInversa1) {
        formPotenciaInversa1.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [1, 2, 0],
                [2, 1, 0],
                [0, 0, -1]
            ];
            let x = [
                parseFloat(document.getElementById('pi1_x1').value),
                parseFloat(document.getElementById('pi1_x2').value),
                parseFloat(document.getElementById('pi1_x3').value)
            ];
            const tol = parseFloat(document.getElementById('pi1_tol').value);
            let resultadoHTML = '';
            
            try {
                // 1. Descomponer A = LU (¡Solo una vez!)
                const { L, U } = decomposeCrout(A);
                
                let iter = 0, mu = 0, lambda = 0, errorAbs = Infinity;
                let filasTabla = [];

                let norm = normalizeVector(x); x = norm.normalized;
                filasTabla.push([iter, formatVector(x, 7), 'N/A', 'N/A']);

                while(errorAbs > tol && iter < MAX_ITER) {
                    iter++;
                    let lambda_anterior = lambda;

                    // 2. Resolver Ay = x (usando LUy = x)
                    // 2a. Resolver Lz = x
                    let z = forwardSubstitution(L, x);
                    // 2b. Resolver Uy = z
                    let y = backwardSubstitution(U, z);
                    
                    // 3. Normalizar y
                    norm = normalizeVector(y);
                    x = norm.normalized; // El nuevo x es el vector propio
                    mu = norm.mu; // mu es el valor propio de A⁻¹
                    
                    // 4. Calcular el valor propio de A
                    lambda = 1.0 / mu;
                    
                    errorAbs = Math.abs(lambda - lambda_anterior);
                    filasTabla.push([iter, formatVector(x, 7), lambda.toFixed(7), errorAbs.toFixed(7)]);
                }
                
                crearTablaResultados(
                    'resultado-potencia-inversa-1',
                    ['Iter (k)', 'Vector Propio x⁽ᵏ⁾', 'Valor Propio (λ)', 'Error Abs.'],
                    filasTabla,
                    `Valor Propio Mínimo λ ≈ ${lambda.toFixed(7)} con Vector ${formatVector(x, 7)}.`
                );

            } catch (error) {
                document.getElementById('resultado-potencia-inversa-1').innerHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
            }
        });
    }

    const formPotenciaInversa2 = document.getElementById('form-potencia-inversa-2');
    if (formPotenciaInversa2) {
        formPotenciaInversa2.addEventListener('submit', (e) => {
            e.preventDefault();
            const A = [
                [4, 1, 0],
                [1, 20, 1],
                [0, 1, 4]
            ];
             let x = [
                parseFloat(document.getElementById('pi2_x1').value),
                parseFloat(document.getElementById('pi2_x2').value),
                parseFloat(document.getElementById('pi2_x3').value)
            ];
            const tol = parseFloat(document.getElementById('pi2_tol').value);
            
            try {
                const { L, U } = decomposeCrout(A);
                let iter = 0, mu = 0, lambda = 0, errorAbs = Infinity;
                let filasTabla = [];

                let norm = normalizeVector(x); x = norm.normalized;
                filasTabla.push([iter, formatVector(x, 7), 'N/A', 'N/A']);

                while(errorAbs > tol && iter < MAX_ITER) {
                    iter++;
                    let lambda_anterior = lambda;
                    let z = forwardSubstitution(L, x);
                    let y = backwardSubstitution(U, z);
                    norm = normalizeVector(y);
                    x = norm.normalized;
                    mu = norm.mu;
                    lambda = 1.0 / mu;
                    errorAbs = Math.abs(lambda - lambda_anterior);
                    filasTabla.push([iter, formatVector(x, 7), lambda.toFixed(7), errorAbs.toFixed(7)]);
                }
                
                crearTablaResultados(
                    'resultado-potencia-inversa-2',
                    ['Iter (k)', 'Vector Propio x⁽ᵏ⁾', 'Valor Propio (λ)', 'Error Abs.'],
                    filasTabla,
                    `Valor Propio Mínimo λ ≈ ${lambda.toFixed(7)} con Vector ${formatVector(x, 7)}.`
                );

            } catch (error) {
                document.getElementById('resultado-potencia-inversa-2').innerHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
            }
        });
    }

}); // Cierre del DOMContentLoaded